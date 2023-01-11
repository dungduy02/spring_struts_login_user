/**
 * 
 */

const URL = 'http://localhost:8080';
 
let countPageMain;
let dataFilter = { product_name: '', is_sales: '', priceStart: 0, priceEnd: 0 };

function reloadPage() {
	const reloadChanges = $('.changPageFor');
	const pageLoad = $('.page-count');
	console.log("Xét backgount trang:");
	let htmls = '';
	let countresult;
	console.log("số trang trong loadPage: " + countPageMain);
	if (countPageMain % 10 == 0) {
		countresult = countPageMain / 10;
		countresult = Math.floor(countresult);
	} else {
		countresult = countPageMain / 10 + 1;
		countresult = Math.floor(countresult);
	}
	if (countresult <= 1) {
		pageLoad.addClass('hidden');
		console.log("hidden:");
	} else {
		console.log("removeHidden:");
		pageLoad.removeClass('hidden');
		for (let i = 1; i <= countresult; i++) {
			console.log(countresult);
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
 
 
 function setBackgroundPage(page) {
	const statusPage = $('.statusPage');
	console.log("xét background: ")
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);
	for (i = 0; i < statusPage.length; i++) {

		if (i == page) {
			console.log("hover bacground: ")
			changPage.html(`<li class=" page-item page-link zd statusPage setBackground" 
							onclick="renderListUsers('${i}');">${i}
						</li>`)
			break;
		}
	}
}
 
async function renderListUsers(page) {
	const data121 = await getDataUsers(page);
	const data12 = data121[0];
	

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
	product_name = dataFilter.product_name, is_sales = dataFilter.is_sales, priceStart = dataFilter.priceStart, priceEnd = dataFilter.priceEnd;
	/*const datachange = await reloadChange();*/
	const datachange = data121[1];

	countPageMain =  data121[1];
	/*countPageMain = datachange.length;*/
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
	<td>${item.product_id}</td>
	<td>${item.product_name}</td>
	<td>${item.description}</td>
	<td>${item.product_price}</td>
	<td id="updateAcc${item.id}" data-active="${item.is_sales}" >${item.is_sales == "0" ? `<span  style="color: green">Đang bán</span>` : `<span style="color: red">Ngừng bán</span>`}</td>
	<td>
	<button class="box">
		<a onclick="deleteUser('${item.product_id}'  class="button" href="productDetail?product_id=${item.product_id}"><i class="fa fa-pencil"></i></a>
	</button>
	<button class="box trash">
	
		<a onclick="deleteUser('${item.product_id}',' ${ item.product_name}' , true);" href="#"> <i
			class="fa fa-trash"> </i> 
		</a>
		

	</button>
</td>

</tr>
`)
		listElement.html(listContent);
	}
	count = 0;

}



async function getDataUsers(page) {
	product_name = dataFilter.product_name, is_sales = dataFilter.is_sales, priceStart = dataFilter.priceStart, priceEnd = dataFilter.priceEnd;

	var data = await $.ajax({
		type: 'GET',
		url: 'pagesProduct?' + 'product_name=' + product_name + '&is_sales=' + is_sales + '&priceStart=' + priceStart + "&priceEnd=" + priceEnd + "&page=" + page,

		/*url: 'pages?' + 'page=' + page,*/
		/* data: 'email=' + email,*/
		success: function(data) {
		},
	});
	return data;
}



function loadData() {
	/*	e.preventDefault();*/
	console.log("có vô đây chưa");
	mapData = {};
	var form = document.getElementById('searchForm');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
		console.log("giá trị của :" + data[1]);
	}
	dataFilter = mapData;
	console.log(dataFilter.product_name);
	if(dataFilter.priceStart > dataFilter.priceEnd){
		alert("Bạn phải nhập 'giá bán từ' thấp hơn 'giá bán đến'");
	}else{
		renderListUsers(1);
	}
}
$('#btnSearch').on('click', loadData);



function deleteUser(product_id, product_name, isSearch = false) {
	var text = 'Bạn chắc chắn muốn xoá sản phẩm có tên: ' + product_name + ' không?';
	/* var page = (id/10);*/
	if (confirm(text) == true)
		$.ajax({
			type: 'POST',
			url: 'deleteProduct?',
			data: 'product_id=' + product_id,
			success: function(data) {
				/*$('#statusUser' + id).html('')*/
				/* getDataUsers(0);*/
				renderListUsers(pageNow);
			},
		});
}

$('#btnDeleteSearch').on('click', function(e) {
	e.preventDefault();
	const listElement = document.getElementById("searchForm");
	console.log("Xóa form");
	listElement.reset();
	dataFilter = { product_name: '', is_sales: '', priceStart : 0, priceEnd: 0 };
	renderListUsers(1);

})



/*Edit Product */
/*Upload Image*/
function chosseFile(fileInput) {
            if(fileInput.files && fileInput.files[0]){
               var reader = new FileReader();

               reader.onload = function (e) {
                  $('#display_image').attr('src', e.target.result);
               }
               reader.readAsDataURL(fileInput.files[0]); 
            }
            
         }

         
     function openAddProduct(){
		 window.location= URL +"/productDetail";
	 }
         
	$('#save').on('click', loadDataAdd);
	
	function loadDataAdd() {
	mapData = {};


	var form = document.getElementById('FormProduct');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
		console.log("mapData[]" + data[1])
	}
	dataFilter = mapData;
	console.log('dataFilter' + dataFilter);
	loadDataInsert();
	if (checkForm(false) == true) {
	console.log('check' );
		insertDataProduct(mapData);
	}
}

function loadDataInsert() {
	mapData = {};
	var form = document.getElementById('FormProduct');
	var formData = new FormData(form);

	for (var data of formData) {
		mapData[data[0]] = data[1];
	}
	dataFilter = mapData;
	/*renderListUsers(pageNow);*/
}


async function insertDataProduct(datas) {
	console.log("insertDataProduct" + datas)
	const data = await changeInsert(datas.product_name, datas.product_price, datas.description, datas.is_sales);
	if(data == null){
		alert("Product đã tồn tại");
	}else{
	if (checkForm(false) == true) {
		/*const listElement = document.getElementById("popup1");
		listElement.style.display = 'none';*/
		alert("Đã thêm một Product");
		window.location= URL +"/product";
		
	}
	/*$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	$("#modalStatus").val(null);*/
		
	}
	/*renderListUsers(pageNow);*/
}

async function changeInsert(product_name, product_price, description, is_sales) {
	var data = await $.ajax({
		type: 'POST',

		url: 'addProduct?' + 'product_name=' + product_name + '&product_price=' + product_price + '&description=' + description + '&is_sales=' + is_sales,
		success: function(data) {
		console.log("dataProduct:" + data);
			/*alert("đã thêm một user");*/
		},
	});
	return data;
}


/*EditProductDetail*/
async function productDetail(product_id) {
	console.log("truyền data và link trang:" + product_id);
	transmissionData(product_id);

	/*openEdit();*/
}

async function transmissionData(product_id){
/*	$('#titleDetail').text(' Chi tiết sản phẩm');*/
/*	$('#checkBtnSubmit').html('<a id="btnEdit" type="submit" class="btnSave">CẬP NHẬT</a>');*/
	let product = await getProduct(product_id);
	console.log("test chạy: " );
	console.log("test chạy: " + product.product_id);
	$('#modalProductName').val(product.product_name);
	$('#modalProductPrice').val(product.product_price);
	$('#modalDescription').val(product.description);
	$('#modalIsSales').val(product.is_sales);
}


async function getProduct(product_id) {
	var data = await $.ajax({
		type: 'GET',
		url: 'getProduct?' + 'product_id=' + product_id,
		success: function(data) {
			console.log("dataProduct: " + data);
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
	var errorPrice = $('#errorPrice');
	
	changeNotify(errorName, '');
	changeNotify(errorPrice, '');
	

	var form = document.getElementById('FormProduct');
	var formData = new FormData(form);
/*
	var regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;*/
	for (var data of formData) {
		mapData[data[0]] = data[1];
	}

	let product;

	if (mapData.product_name.length == 0) {
		changeNotify(errorName, 'Tên sản phẩm không được để trống');
		isValid = false;
	} 
	if (mapData.product_price.length == 0) {
		changeNotify(errorPrice, 'Giá bán không được nhỏ hơn 0');
		isValid = false;
	} 

	return isValid;
}
	
	
function renderListUsersPageStart(){
	renderListUsers(1);
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

loadDataDetail();
	
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}	

function loadDataDetail()	{
	var urlDetail = window.location.href;
	console.log("url: " + urlDetail)
	var productDetail_id = getParameterByName('product_id', urlDetail)
	console.log("productDetail_id" + productDetail_id);
	
	transmissionData(productDetail_id)
	
}
