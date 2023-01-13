<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html>

<html lang="en" xmlns:th="http://www.thymeleaf.org">
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

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.2/united/bootstrap.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
<script src="https://code.jquery.com/jquery-2.0.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.2/summernote.min.css">

<title>Quản lý User</title>
<!--  <link rel="stylesheet" th:href="@{../statics/richtext/richtext.min.css}">
 <link rel="stylesheet" th:href="@{../statics/richtext/jquery.richtext.min.js}"> -->
 <link rel="stylesheet" href="../statics/richtext/richtext.min.css" />

<!-- <link href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css" rel="stylesheet"> -->

<script
	src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
<link
	href=“https://fonts.googleapis.com/css?family=Hammersmith+One&display=swap”
	rel=“stylesheet”>
 <script src="../statics/richtext/jquery.richtext.min.js"></script>
 <style type="text/css">
 	.table th, .table td{
 		max-width: 400px;
 	}
 </style>
</head>
<body style="height: 100%; margin-bottom: 200px;">
	<div class="container">
		<div class="hearder">
			<div class="header_right">
				<div class="logo">
					<img src="../statics/img/logo.png" alt="">
				</div>
				<div class="category">
					<ul>
						<li class="hoverCate"><a href="/product" style="color: white;">Sản phẩm</a></li>
						<li><a>Khách hàng</a></li>
						<li><a href="/user">Users</a></li>
					</ul>
				</div>
			</div>
			<div class="admin">
				<span class="icon"><s:property value="#session.USER" /></span> <a style="color: #0088cc"
					href="/logout"><i class="fa fa-sign-out"></i>LOGOUT</a>
			</div>
		</div>
		<div class="title"
			style="display: flex; justify-content: space-between;">
			<h3 style="text-align: left">
				<a id="titleDetail" href="/user" class="infoUser"
					style="color: black;">Thêm sản phẩm</a>
			</h3>
			<p id="titlePage"
				style="margin: auto 30px; color: blue; display: flex;">
				<a>Sản phẩm</a>
			</p>
		</div>

		<form enctype="multipart/form-data" method="get" id="FormProduct">
			<div>

				<div class="contentpro">
					<div id="contentLeft">
						<div id="editProduct"></div>
						<div class="itemInput">
							<div class="input-group-prepend">
								<span class="input-group-text1">Tên sản phẩm</span>
							</div>
							<input name="product_name" id="modalProductName" type="text"
								class="inputForm" style="height: 30px"
								placeholder="Nhập tên sản phẩm">
						</div>
						<div id="errorName" class="error" for=""></div>
						<div class="itemInput">
							<div class="input-group-prepend">
								<span class="input-group-text1">Giá bán</span>
							</div>
							<input name="product_price" id="modalProductPrice" type="number"
								class="inputForm" style="height: 30px"
								placeholder="Nhập giá bán">
						</div>
						<div id="errorPrice" class="error" for=""></div>
						<div class="itemInput">
							<div class="input-group-prepend">
								<span class="input-group-text1">Mô tả</span>
							</div>
							<div id="textDescription" style="width: 370px;">		
							<textarea  type="text" id="modalDescription" class="modalDescription" name="description" placeholder="Mô tả sản phẩm">
								
							</textarea>
							</div>
							<!-- <textarea rows="10" cols="100" id="modalDescription" class="defaultsummernote"
							name="description" type="text" class="inputForm"
								style="width: 70%; height: 150px" placeholder="Mô tả sản phẩm"
							> Dummy Text </textarea>
							<div class="btn-container"> -->
							
							
							 <!-- <textarea rows="10" cols="100" id="modalDescription"
								name="description" type="text" class="inputForm"
								style="width: 70%; height: 150px" placeholder="Mô tả sản phẩm"></textarea> -->
						</div>
						<div id="errorIs_sales" class="error" for=""></div>
						<div class="itemInput">
							
							<label for="cars" class="input-group-text1"
								style="margin-bottom: 0px; width: 30%;">Trạng thái</label> <select
								name="is_sales" style="width: 70%;" id="modalIsSales"
								class="form-control pr-5">
								<option value="" selected>Chọn trạng thái</option>
								<option value="0">Mở</option>
								<option value="1">Đóng</option>
							</select>
						</div>
						
					</div>
					<div id="contentRight">
						<div style="color: red;">
							<p>Hình ảnh</p>
						</div>
						<img id="display_image" class="imageProduct" src="../statics/img/image.png"> </img>
						<div class="files" style="display: flex;">
							<div
								style="margin: 0 10px; padding: 0px 11px; color: white; background: aqua; border-radius: 4px;">
								<label for="file">Upload</label>
							</div>
							<button type="" class="deleteImg" onclick="deleteFile()">Xóa file</button>
							<input id="nameFile" type="" name="" value=""
								placeholder="tên file upload">
						</div>
						<input style="visibility: hidden;" onchange="chosseFile(this)"
							class="upload" type="file" id="file"
							accept="image/png, image/jpg" />
						<!-- <input type="text" id="product_image" value="" name="product_image" /> -->
					</div>
				</div>
				<div id="update"
					style="text-align: end; margin-right: 10%; display: flex; flex-direction: row-reverse;">
					<div class="btnForm" id="btnForm"
						style="background: red; margin: 5px 10px; border: 0; border-radius: 3px">
						<a id="save" type="submit">LƯU</a>

					</div>
					<a style=" margin: 5px 10px; border: 0; padding: 10px 20px; color: #000aff;" href="/product" id="exit">HỦY</a>
				</div>
			</div>
		</form>


	
	</div>

	<script type="text/javascript">
		$('#modalDescription').richText();
		
	</script>

	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.2/jquery.min.js"
		integrity="sha512-tWHlutFnuG0C6nQRlpvrEhE4QpkG1nn2MOUMWmUeRePl4e3Aki0VB6W1v3oLjFtd0hVOtRQ9PHpSfN6u6/QXkQ=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
		crossorigin="anonymous"></script>


	<script type="text/javascript">
		
	</script>
	<script type="text/javascript" src="../statics/js/product.js"></script>
</body>
</html>