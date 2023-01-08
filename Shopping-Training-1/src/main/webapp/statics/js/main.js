/**
 * 
 */
let countPageMain;
let dataFilter = { fullname: '', email: '', groups: '', active: '' };

async function reloadChange() {
	var data = await $.ajax({
		type: 'GET',
		url: 'getAllUser?' + 'fullname=' + fullname + '&email=' + email + '&group=' + group + "&active=" + active,

		/*url: 'getAllUser',*/
		/*data: 'fullname=' + fullname + 'email=' + email + 'groups=' + groups + "active=" + active,*/
		success: function(data) {

		},
	});
	countPageMain = data.length;
	console.log("tổng số user:" + data.length);
	return data;
}
function reloadPage() {
	const reloadChanges = $('.changPageFor');
	let htmls = '';
	let countresult;
	console.log("countMain" + countPageMain)
	if (countPageMain % 10 == 0) {
		countresult = countPageMain / 10;
		countresult = Math.floor(countresult);
	} else {
		countresult = countPageMain / 10 + 1;
		countresult = Math.floor(countresult);
	}
	console.log("countMainREsult" + countresult)
	for (let i = 1; i <= countresult; i++) {
		htmls += `<div class="changPage${i}">
					<li class=" page-item page-link zd statusPage "
						onclick="renderListUsers('${i}');">${i}
					</li>
				</div>`
	}
	reloadChanges.html(htmls);
}
/*const datachange = reloadChange();*/
/*reloadPage();*/
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
	console.log("mapdata: " + mapData);
	console.log("pageNow: " + pageNow);
	console.log("mapdata: " + dataFilter.fullname);
	/*	getDataSearch(1);
	*/
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
	console.log("page:" + page)
	const data12 = await getDataUsers(page);
	console.log("data12: " + data12);



	let count = 1;
	console.log("count:" + count);
	pageNow = page;

	if (page != 1) {

		console.log("pagepage:" + page);
		count = (page - 1) * 10 + 1;
		console.log("count_10:" + count);
	}
	const listElement = $('#listContent');
	const statusPage = $('.statusPage');
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);
	const reloadChanges = $('#numberUser');
	fullname = dataFilter.fullname, email = dataFilter.email, group = dataFilter.groups, active = dataFilter.active;
	const datachange = await reloadChange();
	console.log("checklistUser:" + datachange.length);
	/*for (i = 0; i < statusPage.length; i++) {

		if (i == page) {
			changPage.html(`<li class=" page-item page-link zd statusPage setBackground" 
							onclick="renderListUsers('${i}');">${i}
						</li>`)
			break;
		}
	}*/

	countPageMain = datachange.length;
	console.log("countPageMain" + countPageMain);
	reloadPage();
	setBackgroundPage(page);

	reloadChanges.html(`<p>

				Hiển thị từ ${count = 1 ? count : count + 1} ~ ${count == 1 ? ((count + 9) > datachange.length ? (count + (datachange.length % 10) - 1) : count + 9) : ((count + 9) > datachange.length ? (count + (datachange.length % 10) - 1) : count + 9)} trong tổng số ${datachange.length}
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
	
		<a onclick="deleteUser('${item.id}', true);" href="#"> <i
			class="fa fa-trash"> </i> 
		</a>
		

	</button>
	<button class="box">
		<a onclick="LockUnLockUser('${item.id}', true);" class="button" ><i class="fa fa-user-plus"></i></a>
	</button>
</td>

</tr>
`)
		listElement.html(listContent);
	}
	count = 0;
	console.log("count_10_end:" + count);

}
async function getDataUsers(page) {
	fullname = dataFilter.fullname, email = dataFilter.email, group = dataFilter.groups, active = dataFilter.active;

	var data = await $.ajax({
		type: 'GET',
		url: 'pages?' + 'fullname=' + fullname + '&email=' + email + '&group=' + group + "&active=" + active + "&page=" + page,

		/*url: 'pages?' + 'page=' + page,*/
		/* data: 'email=' + email,*/
		success: function(data) {
			console.log("dataPage: " + data);
		},
	});
	return data;
}


//SEARCH
var mapData = {};

/*function btnDeleteSearch(){*/
$('#btnDeleteSearch').on('click', function(e) {
	e.preventDefault();
	const listElement = document.getElementById("searchForm");
	listElement.reset();
	renderListUsers(pageNow)

})
/*}*/


//DELETE

function deleteUser(id, isSearch = false) {
	var text = 'Bạn có muốn xoá thành viên có email: ' + id + ' không?';
	/* var page = (id/10);*/
	if (confirm(text) == true)
		$.ajax({
			type: 'POST',
			url: 'deleteUser?',
			data: 'id=' + id,
			success: function(data) {
				if (isSearch) console.log("sdfksdfjsdtttttttttttt");
				else console.log("sdfksdfjsd");
				$('#statusUser' + id).html('')
				/* getDataUsers(0);*/
				renderListUsers(pageNow);
			},
		});
}

//CẬP NHẬT TRẠNG THÁI
function LockUnLockUser(id, isSearch = false) {
	var text;

	let active = $('#updateAcc' + id).attr("data-active");
	if (active == "1") {
		text = 'Bạn có muốn khóa thành viên có email: ' + id + ' không?';
		active = "0";
		if (confirm(text) == true)
			$.ajax({
				type: 'POST',
				url: 'lockUnlockUser',
				data: 'id=' + id + '&active=' + active,
				success: function(data) {
					if (isSearch) console.log("sdfksdfjsd3333333" + active);
					else console.log("sdfksdfjsd");
					if (active == "0") {
						$('#updateAcc' + id).attr("data-active", active);
						$('#updateAcc' + id).html('<p style="color: red">Tạm khóa</p> ')
					}


				},
			});
	} else {
		text = 'Bạn có muốn mở khóa thành viên có email: ' + id + ' không?'
		active = "1";
		if (confirm(text) == true)
			$.ajax({
				type: 'POST',
				url: 'lockUnlockUser',
				data: 'id=' + id + '&active=' + active,
				success: function(data) {
					if (isSearch) console.log("sdfksdfjsd33333334" + active);
					else console.log("sdfksdfjsd");
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
	/*	e.preventDefault();*/
	mapData = {};
	const listElement = document.getElementById("searchForm");
	listElement.reset();

	var form = document.getElementById('insertForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapDataAdd[data[0]] = data[1];
	}
	dataFilter = mapData;
	if (checkForm(false) == true) {
		insertDataUser(mapDataAdd);
		/*renderListUsers(pageNow);*/
	}

	console.log("mapdata: " + mapData);
	console.log("pageNow: " + pageNow);
	console.log("mapdata: " + dataFilter.fullname);
	/*	getDataSearch(1);
	*/
}

function loadDataInsert() {
	/*	e.preventDefault();*/
	mapData = {};
	var form = document.getElementById('searchForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
	}
	dataFilter = mapData;
	console.log("mapdata: " + mapData);
	console.log("pageNow: " + pageNow);
	console.log("mapdata: " + dataFilter.fullname);
	/*	getDataSearch(1);
	*/
	if (checkForm(false) == true) {
		insertDataUser(mapDataAdd);
		/*renderListUsers(pageNow);*/
	}
	/*renderListUsers(pageNow);*/
}
function openAdd() {
	const listElement = document.getElementById("popup1");
	listElement.style.display = 'block';
	$('#titlePopup').text(' Thêm User');
	$('#edituser').html('<input name="id" id="modalId" style="display: none">');
	$('#checkBtnSubmit').html('<a id="btnInsert" type="submit" class="btnSave">Lưu</a>');

	$('#btnInsert').on('click', loadDataAdd);
}



async function insertDataUser(datas) {
	const data = await changeInsert(datas.nameUser, datas.emailUser, datas.passwordUser, datas.group);
	if (checkForm(false) == true) {
		const listElement = document.getElementById("popup1");
		listElement.style.display = 'none';
	}
	/*	$("#modalName").val(null);
		$("#modalEmail").val(null);
		$("#modalPassword").val(null);
		$("#modalRepeatPassword").val(null);
		$("#modalGroup").val(null);
		$("#modalStatus").val(null);*/
	/*renderListUsers(pageNow);*/

}

async function changeInsert(nameUser, emailUser, passwordUser, group) {
	var data = await $.ajax({
		type: 'POST',

		url: 'addUser?' + 'nameUser=' + nameUser + '&emailUser=' + emailUser + '&passwordUser=' + passwordUser + '&group=' + group,
		success: function(data) {

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
	console.log("444444444444" + email);
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
			console.log("data" + data[1])
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



function capnhat() {
	console.log("băt sư kiện ");
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

function closePopupForm() {
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
}

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
	if (pageNow < indexCount - 1)
		var number = parseInt(pageNow, 0);
	console.log("page:" + typeof pageNow == 'number')
	console.log("pageNext:" + number + 1)
	renderListUsers(number+ 1);
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
