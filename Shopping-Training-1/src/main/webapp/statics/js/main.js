/**
 * 
 */
let countPageMain;
async function reloadChange() {
	var data = await $.ajax({
		type: 'GET',
		url: 'getAllUser',
		/*data: 'fullname=' + fullname + 'email=' + email + 'groups=' + groups + "active=" + active,*/
		success: function(data) {
			console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
			console.log("getDataUsersSearch__result", data);
			countPageMain = data.length;
			console.log("số user:" + countPageMain);
		},
	});
	return data;
}
let pageNow;
renderListUsers(1);
async function renderListUsers(page) {
	const data = await getDataUsers(page);
	console.log("data page:" + data);
	console.log("data page11111:" + page);
	var count = 1;
	pageNow = page;
	console.log("pagereder" + pageNow);
	console.log("pagerederNow" + page);
	if (page != 1) {
		count = (page - 1) * 10 + 1;
		console.log("pageredertrongIf" + pageNow);
	console.log("pagerederNow_trongIf" + page);
	console.log("CountrederNow_trongIf" + count);
	
	}
	const listElement = $('#listContent');
	const statusPage = $('.statusPage');
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);


	console.log("pagehere" + page);
	pageset.removeClass("setBackground");
	for (i = 0; i < statusPage.length; i++) {
		console.log("yy");
		console.log("kiem tra page" + page + i);
		if (i == page) {
			changPage.html(`<li class=" page-item page-link zd statusPage setBackground" 
							onclick="renderListUsers('${i}');">${i}
						</li>`)
			break;
		}
	}
	const reloadChanges = $('#numberUser');
	const datachange = await reloadChange();
	console.log("dataachange:" + reloadChange());
	console.log("count:" + count);
	reloadChanges.html(`<p>
				Hiển thị từ ${count = 1 ? count : count+ 1} ~ ${count == 1 ? count + 9 : ((count + 9) > datachange.length ? (count + (datachange.length % 10) -1) : count + 9)} trong tổng số ${datachange.length}
				user
			</p>`)
	const listContent = data.map((item, index) => `
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
	count = 1;
}
async function getDataUsers(page) {

	var data = await $.ajax({
		type: 'GET',
		url: 'pages?' + 'page=' + page,
		/* data: 'email=' + email, */
		success: function(data) {
			console.log("6666666666666666" + data + "dđ" + page);
			console.log("6666666666666666__email" + data.email);
		},
	});
	console.log("getDataUsers__result", data)
	return data;
}

async function changeSearch(fullname, email, group, active) {
	var data = await $.ajax({
		type: 'GET',
		url: 'getByUser?' + 'fullname=' + fullname + '&email=' + email + '&group=' + group + "&active=" + active,
		/*data: 'fullname=' + fullname + 'email=' + email + 'groups=' + groups + "active=" + active,*/
		success: function(data) {
			console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
			console.log("getDataUsersSearch__result", data);
		},
	});
	return data;
}

async function getDataSearch(datas) {
	let count = 1;
	console.log("onFilter", datas);
	const data = await changeSearch(datas.fullname, datas.email, datas.groups, datas.active);
	const listElement = $('#listContent');
	console.log("listUserSeach" + data.length);

	if (data.length == 0) {
		listElement.html(`<td colspan="6" style="color: red; text-align: center;font-size: 20px;">Không tìm thấy dữ liệu</td>`);
	} else {
		const listContent = data.map((item, index) => `
<tr>
	<td>${count++}</td>
	<td>${item.name}</td>
	<td>${item.email}</td>
	<td>${item.group}</td>
	<td id="updateAcc${item.id}" data-active="${item.is_active}" >${item.is_active == "1" ? `<span  style="color: green">Đang hoạt động</span>` : `<span style="color: red">Tạm khóa</span>`}</td>
	<td>
	<button class="box">
		<a onclick="editUser('${item.email}');" class="button" href="#popup1"><i class="fa fa-pencil"></i></a>
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
`);
		listElement.html(listContent);
	}
}

var mapData = {};
$('#btnSearch').on('click', function(e) {
	e.preventDefault();
	mapData = {};
	var form = document.getElementById('searchForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
		console.log("data" + data[1])
	}
	console.log("data" + mapData)
	getDataSearch(mapData);
});

/*function btnDeleteSearch(){*/
$('#btnDeleteSearch').on('click', function(e) {
	e.preventDefault();
	const listElement = document.getElementById("searchForm");
	console.log("close + " + listElement)
	listElement.reset();
	renderListUsers(pageNow)

})
/*}*/



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
						console.log("hoat động");
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
						console.log("tam dung");
						$('#updateAcc' + id).attr("data-active", active);
						$('#updateAcc' + id).html('<p style="color: green">Đang hoạt động</p>')

					}


				},
			});
	}
}
function resetForm() {
	const listElement = document.getElementById("insertForm");
	console.log("close + " + listElement)
	listElement.reset();
}

var mapDataAdd = {};
function openAdd() {
	const listElement = document.getElementById("popup1");
	console.log("close + " + listElement)
	listElement.style.display = 'block';
	$('#titlePopup').text(' Thêm User');
	$('#edituser').html('<input name="id" id="modalId" style="display: none">');
	$('#checkBtnSubmit').html('<a id="btnInsert" type="submit" class="btnSave">Lưu</a>');

	$('#btnInsert').on('click', function BtnSet(e) {
		e.preventDefault();
		const listElement = document.getElementById("searchForm");
		console.log("close + " + listElement)
		listElement.reset();


		mapDataAdd = {};
		var form = document.getElementById('insertForm');
		var formData = new FormData(form);

		for (var data of formData) {
			mapDataAdd[data[0]] = data[1];
			console.log("data" + data[1])
		}
		console.log("data" + mapDataAdd.nameUser)
		if (checkForm(false) == true) {
			insertDataUser(mapDataAdd);
		}
	});
}



async function insertDataUser(datas) {
	console.log("onFilter", datas);
	const data = await changeInsert(datas.nameUser, datas.emailUser, datas.passwordUser, datas.group);
	if (checkForm(false) == true) {
		const listElement = document.getElementById("popup1");
		console.log("xét popups lại")
		console.log("closessssssss + " + listElement)
		listElement.style.display = 'none';
	}
	/*const listElement = document.getElementById("popup1");
		console.log("xét popups lạissss")
		console.log("close + " + listElement)
		listElement.style.display = 'none';
*/
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	renderListUsers(pageNow);

}

async function changeInsert(nameUser, emailUser, passwordUser, group) {
	var data = await $.ajax({
		type: 'POST',

		url: 'addUser?' + 'nameUser=' + nameUser + '&emailUser=' + emailUser + '&passwordUser=' + passwordUser + '&group=' + group,
		/*data: 'fullname=' + fullname + 'email=' + email + 'groups=' + groups + "active=" + active,*/
		success: function(data) {
			console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
			console.log("getDataUsersSearch__result", data);
		},
	});
	return data;
}


$("#addUserss").on('click', function(e) {
	e.preventDefault();
	console.log("data kfjasdfjh")
	openAdd();
});



//EDIT


async function getUser(email) {
	const listElement = document.getElementById("popup1");
	console.log("close + " + listElement)
	listElement.style.display = 'block';
	console.log("444444444444" + email);
	var data = await $.ajax({
		type: 'GET',
		url: 'getUser?' + 'email=' + email,
		success: function(data) {
			console.log("datafullname" + data);
			console.log("datafullname" + data.emailUser);
			/*$('#titlePopup').text(' Chỉnh sửa User');
			$('#checkBtnSubmit').html('<a id="btnEdit" type="submit" class="btnSave">CẬP NHẬT</a>');
			$('#edituser').html('<input name="id" id="modalId" style="display: none">');*/

			/*             $('#modalEmail').html('<input name="emailUser" type="text" class="" value="'+ ${data.email} + '" id="modalEmail">')
			 */           // $('#modalGroup').html('<input name="group" type="text" class="" value="'+ ${data.email} + '" id="modalGroup">')

		},
	});
	return data;
}

async function editUser(email) {
	let user = await getUser(email);
	console.log("dd" + user.id);
	console.log("dd" + user.email);
	console.log("dd" + user.password);
	console.log("dd" + user.name);
	console.log("dd" + user.group);
	$('#modalId').val(user.id);
	$('#modalName').val(user.name);
	$('#modalEmail').val(user.email);
	$('#modalPassword').val(user.password);
	$('#modalRepeatPassword').val(user.password);
	$('#modalGroup').val(user.group);

	openEdit();
}
function openEdit() {
	const listElement = document.getElementById("popup1");
	console.log("close + " + listElement)
	listElement.style.display = 'block';
	$('#titlePopup').text(' Chỉnh sửa User');
	$('#checkBtnSubmit').html('<a id="btnEdit" type="submit" class="btnSave">CẬP NHẬT</a>');
	/*	$('#edituser').html('<input name="id" id="modalId" style="display: none">');*/



	$('#btnEdit').on('click', function(e) {
		e.preventDefault();

		console.log("data kfjasdfjh")
		mapDataAdd = {};
		var form = document.getElementById('insertForm');
		var formData = new FormData(form);

		for (var data of formData) {
			mapDataAdd[data[0]] = data[1];
			console.log("data" + data[1])
		}
		console.log("data" + mapDataAdd)
		console.log("data1111" + mapDataAdd.nameUser)
		if (checkForm(false))
			editDataUser(mapDataAdd);

		/*$("#modalName").val(null);
		$("#modalEmail").val(null);
		$("#modalPassword").val(null);
		$("#modalRepeatPassword").val(null);
		$("#modalGroup").val(null);*/
	});
}
function capnhat() {
	console.log("băt sư kiện ");
}



var mapDataAdd = {};
/*$('#btnEdit').on('click', function (e) {
	 e.preventDefault();
	console.log("băt sư kiện ")
});*/



async function editDataUser(datas) {
	console.log("onFilter", datas);
	console.log("onFilter2222222222", datas.id);
	const data = await changeEdit(datas.nameUser, datas.emailUser, datas.passwordUser, datas.group, datas.id);
	const listElement = document.getElementById("popup1");
	console.log("close + " + listElement)
	listElement.style.display = 'none';
	$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	renderListUsers(pageNow);

}


async function changeEdit(nameUser, emailUser, passwordUser, group, id) {
	var data = await $.ajax({
		type: 'POST',

		url: 'editUser?' + 'nameUser=' + nameUser + '&emailUser=' + emailUser + '&passwordUser=' + passwordUser + '&group=' + group + '&id=' + id,
		/*data: 'fullname=' + fullname + 'email=' + email + 'groups=' + groups + "active=" + active,*/
		success: function(data) {
			console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
			console.log("getDataUsersSearch__result", data);
			$("#modalName").val(null);
			$("#modalEmail").val(null);
			$("#modalPassword").val(null);
			$("#modalRepeatPassword").val(null);
			$("#modalGroup").val(null);
		},
	});
	return data;
}


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

	console.log("userMAP:" + mapData.nameUser.length);
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
	if (mapData.passwordUser.length == 0) {
		changeNotify(errorPassword, 'Mật khẩu không được để trống');
		isValid = false;
	} else if (mapData.passwordUser.length < 6) {
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
	if(pageNow != 1)
	renderListUsers(pageNow - 1);
}
function renderListUsersPageNext() {
	let indexCount;
	if(countPageMain %10 == 0){
		indexCount = countPageMain /10;
	}else{
		indexCount = countPageMain /10 + 1;
	}
	if(pageNow < indexCount)
	renderListUsers(pageNow + 1);
}
/*function renderListUsersPageNext() {
	var count;

	console.log("số user1212212:" + countPageMain);
	countPageMain % 10 == 0 ? (count = countPageMain / 10) : (count = countPageMain / 10 + 1)
	if (pageNow < count) {
		renderListUsers(pageNow + 1);
		console.log("pagepage" + pageNow)
	}
}*/