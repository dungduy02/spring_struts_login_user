<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
  <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!--Bootsrap 4 CDN-->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
         integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      
      <!--Fontawesome CDN-->
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
         integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

   <link rel="stylesheet" href="../statics/css/style.css">
   <title>Login</title>
   
</head>
<body>
<div class="container">
      <div class="title">
         <img src="../statics/img/logo.png" alt="">
      </div>
      <s:set name="checkerror" value="check"/>
      <div class="card-body">
      <s:if test="massage=='errorAccount'">
   			<div class="error" for="">	Kiểm tra lại Email hoặc mật khẩu chưa chính xác </div>
	  </s:if>
     <s:if test="massage=='errorActive'">
   			<div class="error" for="">	Tài khoản của bạn đã tạm dừng hoạt động </div>
	  </s:if>
      <s:form action="/users" method="post" >

			<s:div class="input-group form-group">
               <s:div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
               </s:div>
               <input name="uname" type="text" class="form-control" placeholder="Email"  value="${uname}"/>
               <div>
               </div>
            </s:div>
            <s:if test="massage=='errorMail'">
            	<div class="error" for="">Email không đúng định dạng</div>
			</s:if>
            <div class="input-group form-group">
               <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
               </div>
               <input name="password" type="password" class="form-control" placeholder="Mật khẩu" value="${password}"/>
               <div>               
               </div>  
            </div>
            <s:if test="massage=='errorPass'">
   				<div class="error" for=""> Password không chính xác</div>
			</s:if>
            <div class="row align-items-center remember">
               <input type="checkbox" name="checkRemember" >Remember Me
            </div>
            <div class="form-group">
            <a href="getAll">
               <input align="center" type="submit" value="Đăng nhập" class="btn float-right login_btn"/>
            </a>
            </div>
		</s:form>
     
      </div>
   </div>
</body>
</html>