
let countPageMain;
let dataFilter = { fullname: '', email: '', groups: '', active: '' };
function reloadPage() {
	const reloadChanges = $('.changPageFor');
	const pageLoad = $('.page-count');
	let htmls = '';
	let countresult;
	if (countPageMain % 10 == 0) {
		countresult = countPageMain / 10;
		countresult = Math.floor(countresult);
	} else {
		countresult = countPageMain / 10 + 1;
		countresult = Math.floor(countresult);
	}
	if (countresult <= 1) {
		pageLoad.addClass('hidden');
	} else {
		pageLoad.removeClass('hidden');
		for (let i = 1; i <= countresult; i++) {
			htmls += `<div class="changPage${i}">
					<li class=" page-item page-link zd statusPage "
						onclick="renderListUsers('${i}');">${i}
					</li>
				</div>`
		}
	}

	reloadChanges.html(htmls);
}
let pageNow;

renderListUsers(1);

function loadData() {
	/*	e.preventDefault();*/
	mapData = {};
	var form = document.getElementById('searchForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
	}
	dataFilter = mapData;
	renderListUsers(1);
}
$('#btnSearch').on('click', loadData);

function setBackgroundPage(page) {
	const statusPage = $('.statusPage');
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);
	for (i = 0; i < statusPage.length; i++) {

		if (i == page) {
			changPage.html(`<li class=" page-item page-link zd statusPage setBackground" 
							onclick="renderListUsers('${i}');">${i}
						</li>`)
			break;
		}
	}
}

async function renderListUsers(page) {
	const data12a = await getDataUsers(page);
	const data12 = data12a[0];
	console.log("data12:" + data12a[0]);
	let count = 1;
	pageNow = page;

	if (page != 1) {
		count = (page - 1) * 10 + 1;
	}
	const listElement = $('#listContent');
	const statusPage = $('.statusPage');
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);
	const reloadChanges = $('#numberUser');
	fullname = dataFilter.fullname, email = dataFilter.email, group = dataFilter.groups, active = dataFilter.active;
	/*const datachange = await reloadChange();*/
	const datachange = data12a[1];
	console.log("dataachange: " + datachange);
	/*countPageMain = datachange.length;*/
	countPageMain = data12a[1];
	reloadPage();
	setBackgroundPage(page);
	var numberPage = countPageMain%10==0? countPageMain/10 : countPageMain/10+1;
	var sotrang = parseInt(numberPage, 0);	
	console.log("numberPage: " + sotrang);
	if(sotrang != page){
		console.log("xóa hover cuối trang: " + sotrang)
		const pageLoad = $('.renderListUsersPageEnd');
		pageLoad.removeClass('hiddenNoPage');
	}else{
		const pageLoad = $('.renderListUsersPageEnd');
		pageLoad.addClass('hiddenNoPage');
	}

	reloadChanges.html(`<p>

				Hiển thị từ ${count = 1 ? count : count + 1} ~ ${count == 1 ? ((count + 9) > datachange ? (count + (datachange % 10) - 1) : count + 9) : ((count + 9) > datachange ? (count + (datachange % 10) - 1) : count + 9)} trong tổng số ${datachange}
				user
			</p>`)

	if (data12.length == 0) {
		listElement.html(`<td colspan="6" style="color: red; text-align: center;font-size: 20px;">Không tìm thấy dữ liệu</td>`);
	} else {
		const listContent = data12.map((item, index) => `
<tr id="statusUser${item.id}">
	<td>${count++}</td>
	<td>${item.name}</td>
	<td>${item.email}</td>
	<td>${item.group}</td>
	<td id="updateAcc${item.id}" data-active="${item.is_active}" >${item.is_active == "1" ? `<span  style="color: green">Đang hoạt động</span>` : `<span style="color: red">Tạm khóa</span>`}</td>
	<td>
	<button class="box">
		<a onclick="editUser('${item.email}');"  class="button" href="#popup1"><i class="fa fa-pencil"></i></a>
	</button>
	<button class="box trash">
	
		<a onclick="deleteUser('${item.id}',' ${ item.email}' , true);" href="#"> <i
			class="fa fa-trash"> </i> 
		</a>
		

	</button>
	<button class="box">
		<a onclick="LockUnLockUser('${item.id}',' ${ item.email}' , true);" class="button" ><i class="fa fa-user-plus"></i></a>
	</button>
</td>

</tr>
`)
		listElement.html(listContent);
	}
	count = 0;

}
async function getDataUsers(page) {
	fullname = dataFilter.fullname, email = dataFilter.email, group = dataFilter.groups, active = dataFilter.active;

	var data = await $.ajax({
		type: 'GET',
		url: 'pages?' + 'fullname=' + fullname + '&email=' + email + '&group=' + group + "&active=" + active + "&page=" + page,

		/*url: 'pages?' + 'page=' + page,*/
		/* data: 'email=' + email,*/
		success: function(data) {
			console.log("dataGetDataPage: " + data);
		},
	});
	return data;
}


//SEARCH

$('#btnDeleteSearch').on('click', function(e) {
	e.preventDefault();
	const listElement = document.getElementById("searchForm");
	listElement.reset();
	dataFilter = { fullname: '', email: '', groups: '', active: '' };
	renderListUsers(1);

})
/*}*/


//DELETE

function deleteUser(id, email, isSearch = false) {
	var text = 'Bạn chắc chắn muốn xoá thành viên có email: ' + email + ' không?';
	/* var page = (id/10);*/
	if (confirm(text) == true)
		$.ajax({
			type: 'POST',
			url: 'deleteUser?',
			data: 'id=' + id,
			success: function(data) {
				$('#statusUser' + id).html('')
				/* getDataUsers(0);*/
				renderListUsers(pageNow);
			},
		});
}

//CẬP NHẬT TRẠNG THÁI
function LockUnLockUser(id, email, isSearch = false) {
	var text;

	let active = $('#updateAcc' + id).attr("data-active");
	if (active == "1") {
		text = 'Bạn chắc chắn muốn khóa user có email : ' + email + ' này?';
		active = "0";
		if (confirm(text) == true)
			$.ajax({
				type: 'POST',
				url: 'lockUnlockUser',
				data: 'id=' + id + '&active=' + active,
				success: function(data) {
					if (active == "0") {
						$('#updateAcc' + id).attr("data-active", active);
						$('#updateAcc' + id).html('<p style="color: red">Tạm khóa</p> ')
					}
				},
			});
	} else {
		text = 'Bạn chắc chắn muốn mở khóa thành viên có email: ' + email + ' không?'
		active = "1";
		if (confirm(text) == true)
			$.ajax({
				type: 'POST',
				url: 'lockUnlockUser',
				data: 'id=' + id + '&active=' + active,
				success: function(data) {
					if (active == "1") {
						$('#updateAcc' + id).attr("data-active", active);
						$('#updateAcc' + id).html('<p style="color: green">Đang hoạt động</p>')

					}


				},
			});
	}
}
function resetForm() {
	const listElement = document.getElementById("insertForm");
	listElement.reset();
}


//SEARCH

var mapDataAdd = {};
function loadDataAdd() {
	mapData = {};


	var form = document.getElementById('insertForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapDataAdd[data[0]] = data[1];
	}
	dataFilter = mapData;
	loadDataInsert();
	if (checkForm(false) == true) {
		insertDataUser(mapDataAdd);

	}
}

function loadDataInsert() {
	mapData = {};
	var form = document.getElementById('searchForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
	}
	dataFilter = mapData;
	renderListUsers(pageNow);
}
function openAdd() {
	const listElement = document.getElementById("popup1");
	listElement.style.display = 'block';
	$('#titlePopup').text(' Thêm User');
	$('#edituser').html('<input name="id" id="modalId" style="display: none">');
	$('#checkBtnSubmit').html('<a id="btnInsert" type="submit" class="btnSave">Lưu</a>');
	
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	$("#modalActive").val(null);

	$('#btnInsert').on('click', loadDataAdd);
}

async function insertDataUser(datas) {
	const data = await changeInsert(datas.nameUser, datas.emailUser, datas.passwordUser, datas.repeatPasswordUser, datas.group);
	if(data == null){
		alert("User đã tồn tại");
	}else{
	if (checkForm(false) == true) {
		const listElement = document.getElementById("popup1");
		listElement.style.display = 'none';
		alert("Đã thêm một User");
	}
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	$("#modalStatus").val(null);
		
	}
	/*renderListUsers(pageNow);*/
}

async function changeInsert(nameUser, emailUser, passwordUser, repeatPasswordUser, group) {
	var data = await $.ajax({
		type: 'POST',

		url: 'addUser?' + 'nameUser=' + nameUser + '&emailUser=' + emailUser + '&passwordUser=' + passwordUser + '&repeatPasswordUser=' + repeatPasswordUser + '&group=' + group,
		success: function(data) {

			/*alert("đã thêm một user");*/
		},
	});
	return data;
}


$("#addUserss").on('click', function(e) {
	e.preventDefault();
	openAdd();

});

//EDIT

async function getUser(email) {
	const listElement = document.getElementById("popup1");
	listElement.style.display = 'block';
	var data = await $.ajax({
		type: 'GET',
		url: 'getUser?' + 'email=' + email,
		success: function(data) {
		},
	});
	return data;
}

async function editUser(email) {
	let user = await getUser(email);
	$('#modalId').val(user.id);
	$('#modalName').val(user.name);
	$('#modalEmail').val(user.email);
	$('#modalPassword').val(null);
	$('#modalRepeatPassword').val(null);
	$('#modalGroup').val(user.group);
	$('#modalActive').val(user.is_active);

	openEdit();
}
function openEdit() {
	const listElement = document.getElementById("popup1");
	$('#titlePopup').text(' Chỉnh sửa User');
	$('#checkBtnSubmit').html('<a id="btnEdit" type="submit" class="btnSave">CẬP NHẬT</a>');

	$('#btnEdit').on('click', function(e) {
		e.preventDefault();

		mapDataAdd = {};
		var form = document.getElementById('insertForm');
		var formData = new FormData(form);

		for (var data of formData) {
			mapDataAdd[data[0]] = data[1];
		}
		if (checkForm(false))
			editDataUser(mapDataAdd);

	});
}



async function editDataUser(datas) {

	const data = await changeEdit(datas.nameUser, datas.emailUser, datas.passwordUser, datas.repeatPasswordUser, datas.group, datas.activeUser, datas.id);
	const listElement = document.getElementById("popup1");
	listElement.style.display = 'none';
	renderListUsers(pageNow);
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	$("#activeUser").val(null);

}


async function changeEdit(nameUser, emailUser, passwordUser, repeatPasswordUser, group, activeUser, id) {
	var data = await $.ajax({
		type: 'POST',

		url: 'editUser?' + 'nameUser=' + nameUser + '&emailUser=' + emailUser + '&passwordUser=' + passwordUser + '&repeatPasswordUser=' + repeatPasswordUser + '&group=' + group + '&activeUser=' + activeUser + '&id=' + id,
		success: function(data) {
			$("#modalName").val(null);
			$("#modalEmail").val(null);
			$("#modalPassword").val(null);
			$("#modalRepeatPassword").val(null);
			$("#modalGroup").val(null);
			$("#activeUser").val(null);
		},
	});
	return data;
}



var mapDataAdd = {};



function changeNotify(element, data) {
	element.html(data);
}
function checkForm(checkinsert) {
	mapData = {};
	let isValid = true;
	var errorName = $('#errorName');
	var errorEmail = $('#errorEmail');
	var errorPassword = $('#errorPassword');
	var errorRePassword = $('#errorRePassword');
	var errorGroup = $('#errorGroup');
	changeNotify(errorName, '');
	changeNotify(errorEmail, '');
	changeNotify(errorPassword, '');
	changeNotify(errorRePassword, '');
	changeNotify(errorGroup, '');

	var form = document.getElementById('insertForm');
	var formData = new FormData(form);

	var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
	for (var data of formData) {
		mapData[data[0]] = data[1];
	}

	let user;

	if (mapData.nameUser.length == 0) {
		changeNotify(errorName, 'Vui lòng nhập tên người sử dụng');
		isValid = false;
	} else if (mapData.nameUser.length < 6) {
		changeNotify(errorName, 'Tên phải lớn hơn 5 ký tự');
		isValid = false;
	}
	if (mapData.emailUser.length == 0) {
		changeNotify(errorEmail, 'Email không được để trống');
		isValid = false;
	} else if (!regexMail.test(mapData.emailUser)) {
		changeNotify(errorEmail, 'Email không đúng định dạng');
		isValid = false;
	} else if (user && !isUpdate) {
		changeNotify(errorEmail, 'Email đã được đăng ký');
		isValid = false;
	}

	if (mapData.group.length == 0) {
		changeNotify(errorGroup, 'Nhóm không được để trống');
		isValid = false;
	}
	/*if (mapData.passwordUser.length == 0) {
		changeNotify(errorPassword, 'Mật khẩu không được để trống');
		isValid = false;
	} else */
	if (mapData.passwordUser.length < 6 && mapData.passwordUser.length > 0) {
		changeNotify(errorPassword, 'Mật khẩu phải hơn 5 ký tự');
		isValid = false;
	}

	if (mapData.repeatPasswordUser !== mapData.passwordUser) {
		changeNotify(errorRePassword, 'Mật khẩu và xác nhận mật khẩu không chính xác');
		isValid = false;
	}


	return isValid;
}

function closePopupForm(e) {
	e.preventDefault();
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	console.log("pageNow:" + pageNow);
	renderListUsers(pageNow);
}

/*$("#closeExit").submit('click', function(e) {
	e.preventDefault();
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	console.log("pageNow:" + pageNow);
	renderListUsers(pageNow);

});*/


function renderListUsersPage() {
	if (pageNow != 1)
		renderListUsers(pageNow - 1);
}
function renderListUsersPageNext() {
	let indexCount;
	if (countPageMain % 10 == 0) {
		indexCount = countPageMain / 10;
	} else {
		indexCount = countPageMain / 10 + 1;
	}
	var number
	if (pageNow < indexCount - 1){
		 number = parseInt(pageNow, 0);		
		renderListUsers(number + 1);
	}
}
function renderListUsersPageEnd(){
	let indexCount;
	if (countPageMain % 10 == 0) {
		indexCount = countPageMain / 10;
	} else {
		indexCount = countPageMain / 10 + 1;
	}
	var number = parseInt(indexCount, 0);
	renderListUsers(number);
}

function renderListUsersPageStart(){
	renderListUsers(1);
}


var isUpdate = false;
function getUsers(page = 0, size = 10) {
	currentPage = page;
	$.ajax({
		type: 'GET',
		url: 'user',
		data: 'page=' + page + '&size=' + size,
		success: function(data) {
			getDataUsers(data);
		},
	});
}
