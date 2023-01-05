package com.example.shopping.demo;

import org.apache.ibatis.type.MappedTypes;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.example.shopping.demo.model.User;


import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;

import org.springframework.context.annotation.Bean;

@MappedTypes(User.class)
@MapperScan("com.example.shopping.demo.mapper")
@SpringBootApplication
public class ShoppingTraining1Application extends SpringBootServletInitializer{

//	   @Autowired
//	    private UserService userService;
	     
//	    @Override
//	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	        return application.sources(Application.class);
//	    }
//	   @Override
//	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	        return application.sources(ShoppingTraining1Application.class);
//	    }
	public static void main(String[] args) {
		SpringApplication.run(ShoppingTraining1Application.class, args);
	}

	
     
}
