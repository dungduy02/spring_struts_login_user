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
	<div class="container">
		<div class="hearder">
			<div class="header_right">
				<div class="logo">
					<img src="../statics/img/logo.png" alt="">
				</div>
				<div class="category">
					<ul>
						<li class="hoverCate"><a href="/product">Sản phẩm</a></li>
						<li><a>Khách hàng</a></li>
						<li><a href="/user">Users</a></li>
					</ul>
				</div>
			</div>
			<div class="admin">
				<span class="icon">  <s:property value="#session.USER" />
				</span> <a href="/logouts"><i class="fa fa-sign-out"></i>LOGOUT</a>
			</div>
		</div>
		<div class="title" style="border-bottom: 3px solid #9fc5e8; display: flex; justify-content: space-between;">
			<h3 style="text-align: left; margin: 0;">
				<a href="/product" class="infoProduct" style="color: black;">Danh sách sản phẩm</a>
			</h3>
			<p style="margin: auto 30px; color: blue;">
				<a>Sản phẩm</a>
			</p>
		</div>
		<form enctype="multipart/form-data" method="get" id="searchForm" style="margin: 20px 0 20px;">
			<div class="addProduct" style="width: 80%;">
				<div class="formUser" style="display: flex;">
					<!--  <form class="formUser"> -->
					<div class="itemForm">
						<div class="input-group-prepend">
							<span class="input-group-text1">Tên sản phẩm</span>
						</div>
						<input name="product_name" type="text" class="inputForm" id="modalName"
							value="${product_name}" style="height: 30px"
							placeholder="Nhập tên sản phẩm">
					</div>
					
					<div class="itemForm">
						<div class="listselect">

							<label for="cars" class="input-group-text1">Trạng thái</label> <select
								name="is_sales" class="form-control pr-5" id="modalIsSales">
								<option value="${is_sales}" selected>Chọn trạng thái</option>
								<option value="0">Đang bán</option>
								<option value="1">Ngừng bán</option>
							</select>
						</div>

					</div>
					<div style="display: flex;" class="itemForm">

						<div style="width: 50%">
							<div class="input-group-prepend">
								<span class="input-group-text1">Giá bán từ</span>
							</div>
							<input name="priceStart" type="text" class="inputForm" id="modalPriceStart"
								placeholder="" style="height: 30px; width: 150px" value="0">
						</div>
						<div style="margin: auto 20px;">~</div>
						<div style="width: 50%">
							<div class="input-group-prepend">
								<span class="input-group-text1">Giá bán đến</span>
							</div>
							<input name="priceEnd" type="text" class="inputForm" id="modalPriceEnd"
								placeholder="" style="height: 30px; width: 150px" value="0">
						</div>
					</div>
				</div>
			
			
			
			
				
				<!-- </form> -->
			</div>
			<div>
				<div class="addNew formProduct" style="justify-content: space-between;">
					<div>
						<div class="input-group-prepend">
							<a href="#" onclick="openAddProduct()"> <span
								class="input-group-text colorbtn"><i
									class="fa fa-address-book"></i>Thêm mới</span></a>
						</div>
					</div>
					<div class="search-btn">
						<div>
							<div class="input-group-prepend">
								<a id="btnSearch" type="submit"
									class="input-group-text colorbtn"> <i class="fa fa-search"></i>Tìm
								</a>
							</div>
						</div>
						<div>
							<div class="input-group-prepend">
								<a id="btnDeleteSearch" type="reset" href="#"> <span
									class="input-group-text colordelete"><i
										class="fa fa-trash"></i>Xóa tìm </span>
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</form>


		<div class="page-count">
			<div class="page">
				<ul style="display: flex;">
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPageStart();">&lt&lt</li>
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPage();">&lt</li>
					<div class="changPageFor">
						<%-- <s:iterator begin="1"
							end="objectProduct[1]%10 == 0? (objectProduct[1]/10) : ((objectProduct[1]/10)+1)"
							step="1" var="i">

							<div class="changPage${i}">
								<li class=" page-item page-link zd statusPage "
									onclick="renderListUsers('${i }');">${i }</li>
							</div>

						</s:iterator> --%>
						
					</div>
					<li class=" page-item page-link zd statusPage heddinPage1 renderListUsersPageEnd"
						onclick="renderListUsersPageNext();">&gt</li>
					<li class=" page-item page-link zd statusPage heddinPage1 renderListUsersPageEnd"
						onclick="renderListUsersPageEnd();">	&gt	&gt</li>
						
				</ul>
						
						
					<!--  <li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsers(1);">1</li>
					 <li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsers(2);">2</li>
						<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsers(3);">3</li>
						<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsers(4);">4</li>  -->
			
			</div>
			<div class="textPage" id="numberUser">
				<p>Hiển thị từ 1 ~ 10 trong tổng số 100 sản phẩm</p>
			</div>
		</div>
		<div>
			<table class="table  table-hover">
				<thead>
					<tr class="titleForm">
						<th>#</th>
						<th>Mã sản phẩm</th>
						<th>Tên sản phẩm</th>
						<th>Mô tả</th>
						<th>Giá</th>
						<th>Tình trạng</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="listContent">
					
				</tbody>
			</table>
		</div>
		<div class="page-count">
			<div class="page">
				<ul style="display: flex;">
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPageStart();">&lt&lt</li>
					<li class=" page-item page-link zd statusPage heddinPage1"
						onclick="renderListUsersPage();">&lt</li>
					<div class="changPageFor">
						<%-- <s:iterator begin="1"
							end="objectProduct[1]%10 == 0? (objectProduct[1]/10) : ((objectProduct[1]/10)+1)"
							step="1" var="i">

							<div class="changPage${i}">
								<li class=" page-item page-link zd statusPage "
									onclick="renderListUsers('${i }');">${i }</li>
							</div>

						</s:iterator> --%>
						
					</div>
					<li class=" page-item page-link zd statusPage heddinPage1 renderListUsersPageEnd"
						onclick="renderListUsersPageNext();">&gt</li>
					<li class=" page-item page-link zd statusPage heddinPage1 renderListUsersPageEnd"
						onclick="renderListUsersPageEnd();">	&gt	&gt</li>
						
				</ul>
			
			</div>
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
	<script type="text/javascript" src="../statics/js/product.js"></script>
</body>
</html>