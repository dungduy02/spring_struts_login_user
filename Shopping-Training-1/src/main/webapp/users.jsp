<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.slim.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>

<!-- <link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
	integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
	crossorigin="anonymous"> -->
<link
	href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css"
	rel="stylesheet">
<link
	href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
	rel="stylesheet">
<link rel="stylesheet" href="../statics/css/style.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


<title>Quản lý User</title>
<!-- <link href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css" rel="stylesheet"> -->

<script
	src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
<link
	href=“https://fonts.googleapis.com/css?family=Hammersmith+One&display=swap”
	rel=“stylesheet”>
</head>
<body>

	<div id="popup1" class="overlay">
		<div class="popup">
			<h2 id="titlePopup">Thêm User</h2>
			<a id="closePopupForm" onclick="closePopupForm()" class="close"
				href="#">&times;</a>
			<s:form enctype="multipart/form-data" method="post" id="insertForm">
				<div class="content">
					<div class="col">
						<div id="edituser">
							<input name="id" id="modalId" type="text" style="display: none">
						</div>

						<div class="popup-item">
							<label for="modalName" class="input-group-texta">Tên</label> <input
								name="nameUser" type="text" class="" placeholder="Nhập họ tên"
								id="modalName">
						</div>
						<!-- <label class="error" for="">Họ và tên không được để trống</label> -->
						<%-- <s:if test="massage=='errorAccount'">
							<div class="error" for="">Tài khoản của bạn chưa không hợp
								lệ hoặc đã tồn tại</div>
						</s:if> --%>
						<div id="errorName" class="error" for=""></div>
					</div>
					<div class="col">
						<div class="popup-item">
							<label for="modalEmail" class="input-group-texta">Email</label> <input
								name="emailUser" type="text" class="" placeholder="Nhập Emai"
								id="modalEmail">
						</div>
						<%-- <s:if test="massage=='errorMail'">
							<div class="error" for="">Email không đúng định dạng</div>
						</s:if> --%>
						<div id="errorEmail" class="error" for=""></div>
					</div>
					<div class="col">
						<div class="popup-item">
							<lable class="input-group-texta">Mật khẩu</lable>
							<input name="passwordUser" type="password" class=""
								placeholder="Mật khẩu" id="modalPassword">
						</div>
						<%-- <s:if test="massage=='errorPass'">
							<div class="error" for="">Password không hợp lệ</div>
						</s:if> --%>
						<div id="errorPassword" class="error" for=""></div>
					</div>
					<div class="col">
						<div class="popup-item">
							<lable class="input-group-texta">Xác nhận</lable>
							<input name="repeatPasswordUser" type="password" class=""
								placeholder="Xác nhận mật khẩu" id="modalRepeatPassword">
						</div>
						<%-- <s:if test="massage=='errorPass'">
							<div class="error" for="">Password không hợp lệ</div>
						</s:if> --%>
						<div id="errorRePassword" class="error" for=""></div>
					</div>
					<div class="col">
						<div class="popup-item">

							<label for="modalGroup" class="input-group-texta"
								style="margin-right: 100px">Nhóm</label> <select name="group"
								id="modalGroup" class="form-control pr-5">
								<option value="" selected>Chọn nhóm</option>
								<option value="ADMIN">ADMIN</option>
								<option value="CUSTOMER">CUSTOMER</option>
								<option value="SHOPPING">SHOPPING</option>
								<option value="REVIEWER">REVIEWER</option>
								<option value="EDITOR">EDITOR</option>
							</select>

						</div>
						<label class="error display" for="">Họ và tên không được
							để trống</label>
					</div>
					<div class="col">
						<div class="popup-item">
							<label for="modalActive" class="input-group-texta" style="width: 175px">Trạng thái</label> 
								<select name="activeUser"
								id="modalActive" class="form-control pr-5">
								<option value="" selected>Chọn trạng thái</option>
								<option value="1" selected>Đang hoạt động</option>
								<option value="0">Tạm dừng</option>			
							</select>
						</div>
					</div>
					<div class="checkBtn">
						<div id="checkBtnSubmit">
							<a id=btnInsert type="submit" class="btnSave">LƯU</a>
						</div>
						<button type="button">
							<a type="submit" class="btnSave" href="#"
								onclick="closePopupForm()">HỦY</a>
						</button>
						<!-- <a id="btnInsert" type="submit" class="btnSave">LƯU</a> -->
					</div>
				</div>

			</s:form>
		</div>
	</div>






	<div class="container">
		<div class="hearder">
			<div class="header_right">
				<div class="logo">
					<img src="../statics/img/logo.png" height="50px" alt="">
				</div>
				<div class="category">
					<ul>
						<li><a>Sản phẩm</a></li>
						<li><a>Khách hàng</a></li>
						<li><a>Users</a></li>
					</ul>
				</div>
			</div>
			<div class="admin">
				<span class="icon"><s:property value="#session.USER" /></span> <a
					href="/logout">LOGOUT</a>
			</div>
		</div>
		<div class="title">
			<h3 style="text-align: left">
				<a href="/user" class="infoUser" style="color: black;">Users</a>
			</h3>
		</div>
		<form enctype="multipart/form-data" method="get" id="searchForm">
			<div class="addUser">
				<div class="formUser">
					<!--  <form class="formUser"> -->
					<div>
						<div class="input-group-prepend">
							<span class="input-group-text1">Tên</span>
						</div>
						<input name="fullname" type="text" class="inputForm"
							value="${fullname}" style="height: 30px"
							placeholder="Nhập họ tên">
					</div>
					<div>
						<div class="input-group-prepend">
							<span class="input-group-text1">Email</span>
						</div>
						<input name="email" type="text" class="inputForm"
							placeholder="Nhập Email" style="height: 30px" value="${email}">
					</div>
					<div>
						<div class="listselect">
							<label for="cars" class="input-group-text1">Nhóm</label> <select
								name="groups" id="group" class="form-control pr-5">
								<option value="${groups}" selected>Chọn nhóm</option>
								<option value="ADMIN">ADMIN</option>
								<option value="CUSTOMER">CUSTOMER</option>
								<option value="SHOPPING">SHOPPING</option>
								<option value="REVIEWER">REVIEWER</option>
								<option value="EDITOR">EDITOR</option>
							</select>
						</div>

					</div>
					<div>
						<div class="listselect">

							<label for="cars" class="input-group-text1">Trạng thái</label> <select
								name="active" id="inputState" class="form-control pr-5">
								<option value="${active}" selected>Chọn trạng thái</option>
								<option value="0">Đóng</option>
								<option value="1">Mở</option>
							</select>
						</div>

					</div>
				</div>
				<!-- </form> -->
			</div>
			<div>
				<div class="addNew formUser">
					<div>
						<div class="input-group-prepend">
							<a href="#popup1" onclick="openAdd()"> <span
								class="input-group-text colorbtn"><i
									class="fa fa-address-book"></i>Thêm mới</span></a>
						</div>
					</div>
					<div class="search-btn">
						<div>
							<div class="input-group-prepend">
								<a id="btnSearch" type="submit"
									class="input-group-text colorbtn"> Tìm</a>
							</div>
						</div>
						<div>
							<div class="input-group-prepend">
								<a id="btnDeleteSearch"
									type="reset" href="#"> 
									<span
									class="input-group-text colordelete"><i
										class="fa fa-trash"></i>Xóa tìm
									</span>
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</form>
		<div class="page-count">
			<div class="page pageLoad">
				<ul style="display: flex;">
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPage();"><</li>
						<div class="changPageFor">
					<s:iterator begin="1"
						end="list.size%10 == 0? (list.size/10) : ((list.size/10)+1)"
						step="1" var="i">

						<div class="changPage${i}">
							<li class=" page-item page-link zd statusPage "
								onclick="renderListUsers('${i }');">${i }</li>
						</div>

					</s:iterator>
					</div>
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPageNext();">></li>
				</ul>

			</div>
			<div class="textPage" id="numberUser">
				<p>
					Hiển thị từ 1 ~ 10 trong tổng số
					<s:property value="list.size" />
					user
				</p>
			</div>
		</div>
		<div>
			<table class="table  table-hover">
				<thead>
					<tr class="titleForm">
						<th>#</th>
						<th>Họ tên</th>
						<th>Email</th>
						<th>Nhóm</th>
						<th>Trạng thái</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="listContent">
				</tbody>
			</table>

		</div>
		<div>
			<div class="page pageLoad">
				<ul style="display: flex;">
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPage();"><</li>
						<div class="changPageFor">
					<s:iterator begin="1"
						end="list.size%10 == 0? (list.size/10) : ((list.size/10)+1)"
						step="1" var="i">

						<div class="changPage${i}">
							<li class=" page-item page-link zd statusPage "
								onclick="renderListUsers('${i }');">${i }</li>
						</div>

					</s:iterator>
					</div>
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPageNext();">></li>
				</ul>

			</div>
		</div>
	</div>
	<div id="popupDelete" class="overlay">
		<div class="popup">
			<h2>Bạn có chắc chắn muốn xóa User này</h2>
			<a class="close" href="#">&times;</a>
			<s:form action="/addUser" method="post">
				<div class="content">
					<input type="submit" on value="XÓA" /> <input type="submit"
						value="HỦY BỎ">
				</div>

			</s:form>
		</div>
	</div>

	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.2/jquery.min.js"
		integrity="sha512-tWHlutFnuG0C6nQRlpvrEhE4QpkG1nn2MOUMWmUeRePl4e3Aki0VB6W1v3oLjFtd0hVOtRQ9PHpSfN6u6/QXkQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script> -->
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
		crossorigin="anonymous"></script>


	<script type="text/javascript">
		/* var isUpdate = false;
		function getUsers(page = 0, size = 10) {
		currentPage = page;
		$.ajax({
		   type: 'GET',
		   url: 'user',
		   data: 'page=' + page + '&size=' + size,
		   success: function (data) {
		       getDataUsers(data);
		   },
		});
		} */
		/* 
		 async function getUser(email) {
		 console.log("444444444444" +email);
		 var data = await $.ajax({
		 type: 'GET',
		 url: 'getUser?'+'email=' + email,
		 success: function (data) {
		 console.log("datafullname" + data.email);
		 $('#modalName').html('<input name="nameUser" type="text" class="" value="${data.fullname}" id="modalName">') */
		//  $('#modalEmail').html('<p>có vo đây không vậy</p>') */
		/*             $('#modalEmail').html('<input name="emailUser" type="text" class="" value="'+ ${data.email} + '" id="modalEmail">')
		 *//*  $('#modalGroup').html('<input name="group" type="text" class="" value="'+ ${data.email} + '" id="modalGroup">')

				},
				});
				return data;
				} */

		/* async function editUser(email) {
		 let user = await getUser(email);
		 console.log("dd" + user);
		 console.log("dd" + user.email);
		 /* $('#modalName').val(user.uname);
		 $('#modalEmail').val(user.email);
		
		 } */
	</script>
	<script type="text/javascript" src="../statics/js/main.js"></script>
</body>
</html>