package com.example.shopping.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.shopping.demo.mapper.ProductMapper;
import com.example.shopping.demo.model.Product;
import com.example.shopping.demo.model.User;
import com.opensymphony.xwork2.ActionSupport;

public class ProductAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LogManager.getLogger(UserAction.class.getName());

	private List<Product> products;
	private Product product;
	private String product_id;
	private String product_name;
	private double product_price;
	private String product_image;
	private String is_sales;
	private String description;
	private double priceStart;
	private double priceEnd;
	private int page;
	List<Product> listProduct;
	private ArrayList objectProduct = new ArrayList<>();

	
	
	
	
	public String getProduct_image() {
		return product_image;
	}

	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getProduct_price() {
		return product_price;
	}

	public void setProduct_price(double product_price) {
		this.product_price = product_price;
	}

	public ArrayList getObjectProduct() {
		return objectProduct;
	}

	public void setObjectProduct(ArrayList objectProduct) {
		this.objectProduct = objectProduct;
	}

	public List<Product> getListProduct() {
		return listProduct;
	}

	public void setListProduct(List<Product> listProduct) {
		this.listProduct = listProduct;
	}

	public String getProduct_id() {
		return product_id;
	}

	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public String getIs_sales() {
		return is_sales;
	}

	public void setIs_sales(String is_sales) {
		this.is_sales = is_sales;
	}

	public double getPriceStart() {
		return priceStart;
	}

	public void setPriceStart(double priceStart) {
		this.priceStart = priceStart;
	}

	public double getPriceEnd() {
		return priceEnd;
	}

	public void setPriceEnd(double priceEnd) {
		this.priceEnd = priceEnd;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public ProductMapper getProductMapper() {
		return productMapper;
	}

	public void setProductMapper(ProductMapper productMapper) {
		this.productMapper = productMapper;
	}

	@Autowired
	private ProductMapper productMapper;

	public String Showproduct() {
		
		return "SUCCESS";
	}
	public String productDetail() {
		System.out.println("detial Product:0:llll" + getProduct_id());
		System.out.println("detial:");
		if(getProduct_id() != null) {
			System.out.println("detial Product:0:" + getProduct_id());
			product =  productMapper.getByProductId(getProduct_id());
			System.out.println("product data: " + product);
			return "SUCCESS";
		}else {
			return "ERROR";
		}
	}

	public String getAllProduct() {
		String product_nameNew = getProduct_name().trim();
		products = productMapper.getByProductList(product_nameNew, getIs_sales(), getPriceStart(), getPriceEnd());

		this.listProduct = products;
		LOG.info("Listing persons");
		return SUCCESS;
	}

	public String pageProduct() {
		int total ;
		List<Product> nextList;
		System.out.println("giá từ" +getPriceStart());
		System.out.println("giá đến" +getPriceEnd());
		String product_nameNew = getProduct_name().trim();
		nextList = productMapper.getByProduct(product_nameNew, is_sales, getPriceStart(), getPriceEnd());
		double numberEnd;
		if(getPriceEnd() ==0) {
			numberEnd  = productMapper.maxPrice();
		}else {
			numberEnd = getPriceEnd();
		}
		total = productMapper.getByProductList(product_nameNew, is_sales, getPriceStart(), numberEnd).size();
		
		if (getPriceEnd() < getPriceStart()) {
			System.out.println("lỗi giá nhỏ hơn");
		} else {
			
				
				if (getPage() == 1) {
				
					nextList = productMapper.getByProduct(product_nameNew, is_sales, getPriceStart(), numberEnd);
//        	 list = userMapper.getAll();
//             this.list = list;

					this.products = nextList;
					objectProduct.add(nextList);
					objectProduct.add(total);
				} 
			 else {
				nextList = productMapper.getByProductNext(product_nameNew, is_sales, getPriceStart(), numberEnd,
						(getPage() - 1) * 10);
				System.out.println("dữ liệu trang tiêp theo:" + nextList);
				System.out.println("dữ liệu trang tiêp theo:" + nextList.size());

				System.out.println("data: " + nextList);
//    	 list = userMapper.getAll();
//         this.list = list;
				this.products = nextList;
				objectProduct.add(nextList);
				objectProduct.add(total);
			}
		}
		return SUCCESS;

	}

	public String deleteProduct() {
		productMapper.deleteProduct(this.product_id);
		return SUCCESS;

	}
	

	   
	public String insertProduct() {
		
		System.out.println("product_name:" + getProduct_name());
		System.out.println("product_name_is_sales:" + getIs_sales());
		int setSales = Integer.parseInt(getIs_sales());
		System.out.println("setSales: " + setSales);
		Product p = productMapper.getOneProduct(getProduct_name().trim());
		System.out.println("sản phẩm: " + p);
		int number = productMapper.createId() + 1;;
		char indexName = getProduct_name().charAt(0);
		String indexProduct  = Character.toString(indexName).toUpperCase();
		System.out.println("indexName:" + indexProduct);
//		String numberId = productMapper.fomatNumberId(number);
		System.out.println("number:" + number);
		if(p == null) {
			System.out.println("tiến hành insert:");
			productMapper.insert(indexProduct,number ,getProduct_name(), getProduct_price(), getDescription(), setSales);
			System.out.println("insert Thành công: ");
			product = null;
			return SUCCESS;
		}else {
			System.out.println("insert thất bại: ");
			product = p;
			return SUCCESS;
		}
			
			
	}
	public String updateProduct() {
		
		System.out.println("product_name_id:" + getProduct_id());
		System.out.println("product_name:" + getProduct_name());
		System.out.println("product_name_is_sales:" + getIs_sales());
		int setSales = Integer.parseInt(getIs_sales());
//		double PriceProduct = Double.parseDouble(getProduct_price());
		System.out.println("setSales: " + setSales);
		Product p = productMapper.getByProductId(getProduct_id());
	
//		if(getProduct_name().equalsIgnoreCase(p.getProduct_name()) && (getProduct_price() == p.getProduct_price())	&& getDescription().equalsIgnoreCase(p.getDescription()) && getIs_sales().equalsIgnoreCase(p.getIs_sales())) {
//			return SUCCESS;
//		}
//		else {
			System.out.println("tiến hành Update:");
			productMapper.updateProduct(getProduct_name(), getProduct_price(), getDescription(), getIs_sales(), getProduct_id());
			System.out.println("Update Thành công: ");
//		}
//		else {
//			System.out.println("insert thất bại: ");
//			return "ERROR";
//		}
		
		
		return SUCCESS;
	}

	 public String getProductById() {
 		product =  productMapper.getByProductId(getProduct_id());
 		System.out.println("productGet" + product);
 	return SUCCESS;
 }
	
}
