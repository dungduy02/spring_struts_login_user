package com.example.shopping.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.shopping.demo.model.Product;
import com.example.shopping.demo.model.User;

@Mapper
public interface ProductMapper {

	
	@Select("select * from pst_product where (`product_name` like concat('%',#{product_name}, '%') AND is_sales like concat('%', #{is_sales}, '%') AND product_price BETWEEN #{priceStart} AND #{priceEnd} ) ORDER BY created_at DESC ")
	List<Product> getByProductList(@Param("product_name") String product_name,@Param("is_sales") String is_sales, @Param("priceStart") double priceStart, @Param("priceEnd") double priceEnd);
	
	@Select("select * from pst_product where `product_name` like concat('%',#{product_name}, '%') AND is_sales like concat('%', #{is_sales}, '%') AND product_price BETWEEN #{priceStart} AND #{priceEnd} ORDER BY created_at DESC LIMIT 10")
	List<Product> getByProduct(@Param("product_name") String product_name,@Param("is_sales") String is_sales, @Param("priceStart") double priceStart, @Param("priceEnd") double priceEnd);
	
	@Select("select * from pst_product where `product_name` like concat('%',#{product_name}, '%') AND is_sales like concat('%', #{is_sales}, '%') AND product_price BETWEEN #{priceStart} AND #{priceEnd} ORDER BY created_at DESC LIMIT #{page}, 10")
	List<Product> getByProductNext(@Param("product_name") String product_name,@Param("is_sales") String is_sales, @Param("priceStart") double priceStart, @Param("priceEnd") double priceEnd, @Param("page") int page);
	
	@Select("DELETE FROM  pst_product WHERE product_id = #{id}")
	void deleteProduct(@Param("id") String id);
	
	@Select("SELECT * FROM  pst_product WHERE product_name = #{product_name}")
	Product getOneProduct(@Param("product_name") String product_name); 	
	
	@Select("SELECT MAX(product_price) FROM  pst_product")
	double maxPrice();
	
	@Select("SELECT MAX(RIGHT(product_id, 4)) FROM pst_product;")
	int createId();
	
	
	@Select("INSERT INTO pst_product(product_id, product_name, product_price, description, is_sales, created_at) values((concat(#{indexName}, (SELECT LPAD(#{number}, 9, 0)))), #{product_name}, #{product_price}, #{description}, #{is_sales}, CURRENT_TIMESTAMP())")
	void insert(@Param("indexName") String indexName, @Param("number") int number,@Param("product_name") String product_name, @Param("product_price") double product_price, @Param("description") String description, @Param("is_sales") int is_sales);
	
	@Select("INSERT INTO pst_product(product_id, product_name, product_price, description, is_sales, product_image, created_at) values((concat(#{indexName}, (SELECT LPAD(#{number}, 9, 0)))), #{product_name}, #{product_price}, #{description}, #{is_sales}, #{product_image}, CURRENT_TIMESTAMP())")
	void insertImage(@Param("indexName") String indexName, @Param("number") int number,@Param("product_name") String product_name, @Param("product_price") double product_price, @Param("description") String description, @Param("is_sales") int is_sales, @Param("product_image") String product_image);
	
	@Select("SELECT * FROM pst_product WHERE product_id = #{product_id}")
	Product getByProductId(@Param("product_id") String product_id);
	
	@Select("UPDATE pst_product SET product_name = #{product_name}, product_price = #{product_price}, description = #{description}, is_sales = #{is_sales}, updated_at = CURRENT_TIMESTAMP() WHERE  product_id = #{product_id}")
	void updateProduct(@Param("product_name") String product_name,@Param("product_price") double product_price, @Param("description") String description, @Param("is_sales") String is_sales, @Param("product_id") String product_id);
	
}
