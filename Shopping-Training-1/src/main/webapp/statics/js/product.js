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
						onclick="renderListProduct('${i}');">${i}
					</li>
				</div>`
		}
	}

	reloadChanges.html(htmls);
}
let pageNow;

renderListProduct(1);


function setBackgroundPage(page) {
	const statusPage = $('.statusPage');
	console.log("xét background: ")
	const pageset = $('.statusPage');
	const changPage = $('.changPage' + page);
	for (i = 0; i < statusPage.length; i++) {

		if (i == page) {
			console.log("hover bacground: ")
			changPage.html(`<li class=" page-item page-link zd statusPage setBackground" 
							onclick="renderListProduct('${i}');">${i}
						</li>`)
			break;
		}
	}
}

async function renderListProduct(page) {
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

	countPageMain = data121[1];
	/*countPageMain = datachange.length;*/
	reloadPage();
	setBackgroundPage(page);

	var numberPage = countPageMain % 10 == 0 ? countPageMain / 10 : countPageMain / 10 + 1;
	var sotrang = parseInt(numberPage, 0);
	console.log("numberPage: " + sotrang);
	if (sotrang != page) {
		console.log("xóa hover cuối trang: " + sotrang)
		const pageLoad = $('.renderListUsersPageEnd');
		pageLoad.removeClass('hiddenNoPage');
	} else {
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
	<td onmouseover="hoverImg(${index});" onmouseout="nohoverImg(${index})">${item.product_id}
	<div class="hovers${index} hiddenImg" style="position: absolute; width: 100px; height: 100px; border:2px solid;"> 
         <img src="${item.product_image}" alt="" style="width: 100%; height: 100%"/>
    </div
	</td>
	
	<td>${item.product_name}</td>
	<td style="width: 500px;"> 
		<div class="setLengthText">
			${item.description}</td>
		</div>
	<td>${item.product_price}</td>
	<td id="updateAcc${item.id}" data-active="${item.is_sales}" >${item.is_sales == "0" ? `<span  style="color: green">Đang bán</span>` : `<span style="color: red">Ngừng bán</span>`}</td>
	<td>
	<button class="box">
		<a  class="button" href="productDetail?product_id=${item.product_id}"><i class="fa fa-pencil"></i></a>
	</button>
	<button class="box trash">
	
		<a onclick="deleteUser('${item.product_id}',' ${item.product_name}' , true);" href="#"> <i
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
		const start = new Number(dataFilter.priceStart);
		const end = new Number(dataFilter.priceEnd);
	if (start > end) {
		alert("Bạn phải nhập 'giá bán từ' thấp hơn 'giá bán đến'");
	} else {
		renderListProduct(1);
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
				renderListProduct(pageNow);
			},
		});
}

$('#btnDeleteSearch').on('click', function(e) {
	e.preventDefault();
	const listElement = document.getElementById("searchForm");
	console.log("Xóa form");
	listElement.reset();
	dataFilter = { product_name: '', is_sales: '', priceStart: 0, priceEnd: 0 };
	renderListProduct(1);

})



/*Edit Product */
/*Upload Image*/
function chosseFile(fileInput) {
	console.log(fileInput.value);
	$('#nameFile').val(fileInput.value);
	if (fileInput.files && fileInput.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {

			$('#display_image').attr('src', e.target.result);
			/* var images = $('#display_image').attr('src');
             $('#product_image').val('"' + images + '"');*/
		}
		reader.readAsDataURL(fileInput.files[0]);
	}

}

function deleteFile(){
	$('#display_image').attr('src', "");
}

function openAddProduct() {
	/* window.location= URL +"/productDetail";*/
	$('#titleDetail').text(' Thêm sản phẩm');
	$('#btnForm').html('<a id="save" type="submit" >LƯU</a>')
	$('#titlePage').html('<a style="margin: 0 10px;">Sản phẩm</a> &gt <div style="margin: 0 10px;"> Thêm sản phẩm </div>')

	$('#save').on('click', loadDataAdd);
}


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
		console.log('check');
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
	console.log(typeof datas.product_price);
	//
	console.log("product_image" + datas.prduct_image);
	
	//
	const data = await changeInsert(datas.product_name, datas.product_price, datas.description, datas.is_sales);

	console.log("insertDataProductChang" + data)
	if (data != null) {
		alert("Product đã tồn tại");
	} else {
		if (checkForm(false) == true) {
			/*const listElement = document.getElementById("popup1");
			listElement.style.display = 'none';*/
			alert("Đã thêm một Product");
			window.location = URL + "/product";

		}
	}
	/*$("#modalName").val(null);
	$("#modalEmail").val(null);
	$("#modalPassword").val(null);
	$("#modalRepeatPassword").val(null);
	$("#modalGroup").val(null);
	$("#modalStatus").val(null);*/

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

async function transmissionData(product_id) {
	let productOne = await getProduct(product_id);
	console.log("nhận id: ")
	console.log("nhận id với Id: " + product_id)
	$('#titleDetail').text(' Chi tiết sản phẩm');
	$('#editProduct').html('<input name="product_id" id="modalProductId" style="display: none">');
	$('#btnForm').html('<a id="btnUpdate" type="submit" >LƯU</a>');
	$('#titlePage').html('<a style="margin: 0 10px;">Sản phẩm</a> &gt <div style="margin: 0 10px;"> Chi tiết sản phẩm </div>');
	$('.richText-editor').html(`<div>${productOne.description}<div>`);
	/*$('.richText-editor').text(`${productOne.description}`);*/
	console.log("test chạy: ");
	console.log("test chạy product name: " + productOne.description);
	$('#modalProductId').val(productOne.product_id);
	$('#modalProductName').val(productOne.product_name);
	$('#modalProductPrice').val(productOne.product_price);
	$('#modalDescription').val(productOne.description);
	$('#modalIsSales').val(productOne.is_sales);

	$('#btnUpdate').on('click', loadDataUpdate);
}


async function getProduct(product_id) {
	console.log("getProduct: ")
	console.log("getProduct có Id: " + product_id)
	var data = await $.ajax({
		type: 'GET',
		url: 'getProduct?' + 'product_id=' + product_id,
		success: function(data) {
			console.log("dataProductProduct: ");
			console.log("dataProduct: " + data);
		},
	});
	return data;
}


function loadDataUpdate() {
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
		console.log('check');
		updateDataProduct(mapData);
	}
}

async function updateDataProduct(datas) {
	console.log("updateDataProduct" + datas)
	const data = await changeUpdate(datas.product_name, datas.product_price, datas.description, datas.is_sales, datas.product_id);
	console.log("DataUpdate: " + data);
	console.log("DataUpdateId0: " + data.product_id);
	if (data == null) {
		alert("Bạn không thay đổi thông tin gì");
	} else {
		if (checkForm(false) == true) {
			/*const listElement = document.getElementById("popup1");
			listElement.style.display = 'none';*/
			alert("Đã update thành công");
			window.location = URL + "/product";

		}

	}
	/*renderListUsers(pageNow);*/
}

async function changeUpdate(product_name, product_price, description, is_sales, product_id) {
	var data = await $.ajax({
		type: 'POST',

		url: 'updateProduct?' + 'product_name=' + product_name + '&product_price=' + product_price + '&description=' + description + '&is_sales=' + is_sales + '&product_id=' + product_id,
		success: function(data) {
			/*console.log("dataProduct:" + data);*/
			/*alert("đã thêm một user");*/
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
	var errorIs_sales = $('#errorIs_sales');

	changeNotify(errorName, '');
	changeNotify(errorPrice, '');
	changeNotify(errorIs_sales, '');


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
	if(mapData.product_name.length <= 5){
		changeNotify(errorName, 'Tên sản phẩm phải lớn hơn 5 ký tự');
		isValid = false;
	}
	if (mapData.product_price.length == 0) {
		changeNotify(errorPrice, 'Giá bán không được nhỏ hơn 0');
		isValid = false;
	}
	if (mapData.is_sales.length == 0) {
		changeNotify(errorPrice, 'Trạng thá không được để trống');
		isValid = false;
	}

	return isValid;
}


function renderListUsersPageStart() {
	renderListProduct(1);
}
function renderListUsersPage() {
	if (pageNow != 1)
		renderListProduct(pageNow - 1);
}
function renderListUsersPageNext() {
	let indexCount;
	if (countPageMain % 10 == 0) {
		indexCount = countPageMain / 10;
	} else {
		indexCount = countPageMain / 10 + 1;
	}
	if (pageNow < indexCount - 1) {
		number = parseInt(pageNow, 0);
		renderListProduct(number + 1);
	}
}
function renderListUsersPageEnd() {
	let indexCount;
	if (countPageMain % 10 == 0) {
		indexCount = countPageMain / 10;
	} else {
		indexCount = countPageMain / 10 + 1;
	}
	var number = parseInt(indexCount, 0);
	renderListProduct(number);
}


function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
loadPage(1);
function loadPage(indexLoad){
	if(indexLoad == 1){
		loadDataDetail();
		loadPage(2);
	}else{
	loadDataDetail();
	}
}
function loadDataDetail() {
	var urlDetail = window.location.href;
	console.log("url: " + urlDetail)
	var productDetail_id = getParameterByName('product_id', urlDetail)
	console.log("productDetail_id" + productDetail_id);
	
	if (productDetail_id != null) {
		transmissionData(productDetail_id);
		
	}
	if (urlDetail === URL + '/productDetail'){		
		openAddProduct();
		indexLoad = 1;
	}

}

function hoverImg(index) {
	for(let i = 0 ; i <10 ; i++){
		if(i == index){
		console.log("hover vào");
		const hoverImges = $('.hovers' + index);
		hoverImges.removeClass('hiddenImg');
			
		}
	}
}
function nohoverImg(index) {
	for(let i = 0 ; i <10 ; i++){
		if(i == index){
		console.log("không hover vào");
		const hoverImges = $('.hovers' + index);
		hoverImges.addClass('hiddenImg');
			
		}
	}
	
}
/*$(document).ready(function(){
	$('#modalDescription').richText();
	
});*/

