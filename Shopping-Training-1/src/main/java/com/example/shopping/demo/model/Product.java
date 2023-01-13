package com.example.shopping.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pst_product")
public class Product {
	@Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
	private String product_id;
	@Column(name = "product_name")
	private String product_name;
	@Column(name = "product_image")
	private String product_image;
	@Column(name = "product_price")
	private double product_price;
	@Column(name = "is_sales")
	private String is_sales;
	@Column(name = "description")
	private String description;
	@Column(name = "created_at")
	private String created_at;
	@Column(name = "update_at")
	private String update_at;
	public Product(String product_id, String product_name, String product_image, double product_price, String is_sales,
			String description, String created_at, String update_at) {
		super();
		this.product_id = product_id;
		this.product_name = product_name;
		this.product_image = product_image;
		this.product_price = product_price;
		this.is_sales = is_sales;
		this.description = description;
		this.created_at = created_at;
		this.update_at = update_at;
	}
	public String getProduct_id() {
		return product_id;
	}
	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getProduct_image() {
		return product_image;
	}
	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}
	public double getProduct_price() {
		return product_price;
	}
	public void setProduct_price(double product_price) {
		this.product_price = product_price;
	}
	public String getIs_sales() {
		return is_sales;
	}
	public void setIs_sales(String is_sales) {
		this.is_sales = is_sales;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCreated_at() {
		return created_at;
	}
	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}
	public String getUpdate_at() {
		return update_at;
	}
	public void setUpdate_at(String update_at) {
		this.update_at = update_at;
	}

	
	
	
}
