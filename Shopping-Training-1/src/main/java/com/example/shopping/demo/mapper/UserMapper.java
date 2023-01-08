package com.example.shopping.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.shopping.demo.model.User;

@Mapper
public interface UserMapper {

	@Select("select * from user where is_delete = 0 ORDER BY create_day DESC")
	List<User> getAll();
//	User[] findAll();
	
	@Select("select * from `user` where email= #{email}")
	User getByUser(@Param("email") String email);
	
	@Select("select * from `user` where id= #{id}")
	User getUserById(@Param("id") Long id);
//	List<User> findAll();

	
	@Select("select * from user where (`name` like concat('%',#{fullname}, '%') AND email like concat('%', #{email}, '%') AND `group` like concat('%', #{groups}, '%') AND is_active like concat('%', #{active}, '%') AND is_delete = 0) ORDER BY create_day DESC ")
	List<User> getByUsersList(@Param("fullname") String name,@Param("email") String email, @Param("groups") String groups, @Param("active") String active);
	
	@Select("select * from user where `name` like concat('%',#{fullname}, '%') AND email like concat('%', #{email}, '%') AND `group` like concat('%', #{groups}, '%') AND is_active like concat('%', #{active}, '%') AND is_delete = 0 ORDER BY create_day DESC LIMIT 10")
	List<User> getByUsers(@Param("fullname") String fullname,@Param("email") String email, @Param("groups") String groups, @Param("active") String active);
	
	@Select("select * from user where (`name` like concat('%',#{fullname}, '%') AND email like concat('%', #{email}, '%') AND `group` like concat('%', #{groups}, '%') AND is_active like concat('%', #{active}, '%') AND is_delete = 0) ORDER BY create_day DESC LIMIT #{page}, 10")
	List<User> getByUsersNext(@Param("fullname") String fullname,@Param("email") String email, @Param("groups") String groups, @Param("active") String active, @Param("page") int page);
	
	@Select("UPDATE `user` SET last_login_date = NOW() WHERE id = #{userId}")
	void updateDateUser(@Param("userId") Long userId);
	

	@Select("INSERT INTO `user`(usename, `name`, email, password, `group`, is_active, create_day, is_delete) values(#{name}, #{name}, #{email}, #{password}, #{group}, 1, CURRENT_TIMESTAMP(), 0)")
	void insert(@Param("name") String name,@Param("email") String email, @Param("password") String password, @Param("group") String group);
	
	@Select("UPDATE `user` SET usename = #{name}, `name` = #{name}, email = #{email}, password = #{password}, `group` = #{group}, is_active = #{is_active}, create_day = CURRENT_TIMESTAMP(), is_delete = 0 WHERE  id = #{id}")
	void editUser(@Param("name") String name,@Param("email") String email, @Param("password") String password, @Param("group") String group, @Param("is_active") String is_active, @Param("id") Long id);
	
	@Select("UPDATE `user` SET usename = #{name}, `name` = #{name}, email = #{email}, `group` = #{group}, is_active = #{is_active}, create_day = CURRENT_TIMESTAMP(), is_delete = 0 WHERE  id = #{id}")
	void editUserNoPass(@Param("name") String name,@Param("email") String email, @Param("group") String group, @Param("is_active") String is_active, @Param("id") Long id);
	
	
	
	@Select("UPDATE `user` SET is_delete = 1 WHERE id = #{id}")
	void deleteUser(@Param("id") Long id);
	
	@Select("SELECT * FROM user WHERE is_delete = 0 ORDER BY create_day DESC LIMIT 10")
	List<User> get10User();
	
	@Select("SELECT * FROM user WHERE is_delete = 0 ORDER BY create_day DESC LIMIT #{page}, 10")
	List<User> getNextUser(@Param("page") int page);
	

	@Select("UPDATE `user` SET is_active = #{is_active} WHERE id = #{id}")
	void lockUnlockUser(@Param("is_active") String is_active, @Param("id") Long id);
}
