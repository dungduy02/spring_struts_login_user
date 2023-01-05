package com.example.shopping.demo.model;



import java.sql.Date;

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
@Table(name = "user")
public class User {
	@Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "useemail")
	private String usename;
	@Column(name = "name")
	private String name;
	@Column(name = "email")
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "last-login-date")
	private Date last_login_date;
	@Column(name = "is_active")
	private Long is_active;
	@Column(name = "group")
	private String group;
	@Column(name = "status")
	private Long status;
	@Column(name = "is_delete")
	private Long is_delete;
	
	
	
	public User(Long id, String usename, String name, String email, String password, Date last_login_date,
			Long is_active, String group, Long status, Long is_delete) {
		super();
		this.id = id;
		this.usename = usename;
		this.name = name;
		this.email = email;
		this.password = password;
		this.last_login_date = last_login_date;
		this.is_active = is_active;
		this.group = group;
		this.status = status;
		this.is_delete = is_delete;
	}

	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}
	
	

	public Long getIs_delete() {
		return is_delete;
	}

	public void setIs_delete(Long is_delete) {
		this.is_delete = is_delete;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsename() {
		return usename;
	}
	public void setUsename(String usename) {
		this.usename = usename;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getLast_login_date() {
		return last_login_date;
	}
	public void setLast_login_date(Date last_login_date) {
		this.last_login_date = last_login_date;
	}
	public Long getIs_active() {
		return is_active;
	}
	public void setIs_active(Long is_active) {
		this.is_active = is_active;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public Long getStatus() {
		return status;
	}
	public void setStatus(Long status) {
		this.status = status;
	}
	
	
	
	
	
	


}
