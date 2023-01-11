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
				<span class="icon"> <!-- <s:property value="#session.Product" /> -->
				</span> <a href="/logouts"><i class="fa fa-sign-out"></i>LOGOUT</a>
			</div>
		</div>
		<div class="title">
         <h3 style="text-align: left">
            <a id="titleDetail" href="/user" class="infoUser" style="color: black;">Thêm sản phẩm</a>
         </h3>
      </div>
		
		<form enctype="multipart/form-data" method="get" id="FormProduct">
			<div>

				<div class="contentpro">
					<div id="contentLeft">
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
							<input name="product_price" id="modalProductPrice" type="text"
								class="inputForm" style="height: 30px"
								placeholder="Nhập giá bán">
						</div>
						<div id="errorPrice" class="error" for=""></div>
						<div class="itemInput">
							<div class="input-group-prepend">
								<span class="input-group-text1">Mô tả</span>
							</div>
							<textarea rows="10" cols="100" id="modalDescription"
								name="description" type="text" class="inputForm" 
								style="width: 70%; height: 150px" placeholder="Mô tả sản phẩm"></textarea>
						</div>
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
						<div class="imageProduct">
							<img id="display_image" class="imageProduct"> </img>
						</div>
						<div class="files">
							<input onchange="chosseFile(this)" class="upload" type="file"
								id="image_input" accept="image/png, image/jpg" />

							<button type="" class="deleteImg">Xóa file</button>
							<input type="" name="" value="" placeholder="tên file upload">
						</div>
					</div>
				</div>
				<div id="update">
					<button id="exit">HỦY</button>
					<a id="save" type="submit">LƯU</a>
				</div>
			</div>
		</form>


		
		
		
	</div>


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