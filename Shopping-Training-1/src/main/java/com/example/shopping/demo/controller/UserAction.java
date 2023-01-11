package com.example.shopping.demo.controller;

import com.example.shopping.demo.mapper.UserMapper;
import com.example.shopping.demo.model.User;
import com.example.shopping.demo.utitls.PageUtitls;
import com.opensymphony.xwork2.ActionSupport;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class UserAction extends ActionSupport {

	 private static final Logger LOG = LogManager.getLogger(UserAction.class.getName());
	 private String fullname;
	 private String email;
	 private String group;
	 private int status;
	 private String nameUser;
	 private String emailUser;
	 private String passwordUser;
	 private String repeatPasswordUser;
	 private String activeUser;
	 private String massage = "";
	 private String groups;
	 private String active;
	 private String notification;
	 private int page;
	 private int size = 10;

	 private int totalPages = 0;
	 private int totalRecord;
	 private List<User> list;
	 private User user1;
	 private Long id;

	private static final long serialVersionUID = 1L;
    private List<User> users;
    
    private ArrayList object = new ArrayList<>();
    
    

    public ArrayList getObject() {
		return object;
	}

	public void setObject(ArrayList object) {
		this.object = object;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}

	public void setEmailUser(String emailUser) {
		this.emailUser = emailUser;
	}

	public void setPasswordUser(String passwordUser) {
		this.passwordUser = passwordUser;
	}

	public void setRepeatPasswordUser(String repeatPasswordUser) {
		this.repeatPasswordUser = repeatPasswordUser;
	}

	public void setActiveUser(String activeUser) {
		this.activeUser = activeUser;
	}

	public void setMassage(String massage) {
		this.massage = massage;
	}

	public void setGroups(String groups) {
		this.groups = groups;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public void setNotification(String notification) {
		this.notification = notification;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public void setList(List<User> list) {
		this.list = list;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	public void setbCryptPasswordEncoder(BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public void setMatcher(Matcher matcher) {
		this.matcher = matcher;
	}
	
	
	public String getFullname() {
		return fullname;
	}

	public String getEmail() {
		return email;
	}

	public String getGroup() {
		return group;
	}

	public int getStatus() {
		return status;
	}

	public String getNameUser() {
		return nameUser;
	}

	public String getEmailUser() {
		return emailUser;
	}

	public String getPasswordUser() {
		return passwordUser;
	}

	public String getRepeatPasswordUser() {
		return repeatPasswordUser;
	}

	public String getActiveUser() {
		return activeUser;
	}

	public String getMassage() {
		return massage;
	}

	public String getGroups() {
		return groups;
	}

	public String getActive() {
		return active;
	}

	public String getNotification() {
		return notification;
	}

	public int getPage() {
		return page;
	}

	public int getSize() {
		return size;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public List<User> getList() {
		return list;
	}

	public User getUser1() {
		return user1;
	}

	public Long getId() {
		return id;
	}

	public List<User> getUsers() {
		return users;
	}

	public UserMapper getUserMapper() {
		return userMapper;
	}

	public BCryptPasswordEncoder getbCryptPasswordEncoder() {
		return bCryptPasswordEncoder;
	}

	public Matcher getMatcher() {
		return matcher;
	}


	@Autowired
    private UserMapper userMapper;
    
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

     
	private static Pattern pattern;
	private Matcher matcher;
	private static final String EMAIL_REGEX =   "^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)$";
	
	public boolean validate(String email) {
		pattern = Pattern.compile(EMAIL_REGEX);
		matcher = pattern.matcher(email);
		return matcher.matches();
	}
    
//    public String getByUser() {
//    
//    	list = userMapper.getByUsersList(fullname, email, getGroup(), getActive());
//
//    	List<User> nextList;
//         this.list = list;
//    	users = userMapper.getByUsersList(fullname, email, getGroup(), getActive());
//
//    	this.email = email;
//    	this.fullname = fullname;
//    	this.groups = getGroups();
//    	this.active = getActive();
//    	if(users.size() >0) {
//    		this.users = users;
//    	}else {
//    		this.users = users;
//    		this.notification = "noFindUser";
//    	}
//        this.list = list;
//    	return SUCCESS;
//    }
    
public String insertUser() {
	String encodedPassword = bCryptPasswordEncoder.encode(passwordUser);
	System.out.println("repeatPasswordUser:" + repeatPasswordUser);

	if(!validate(emailUser)) {
		this.massage = "errorMail";
		
		return "SUCCESS";
	}
	if(this.passwordUser.length() <3) {
		this.massage = "errorPass";
		
		return "SUCCESS";
	}
	if(passwordUser.equalsIgnoreCase(repeatPasswordUser)) {
		User u = userMapper.getByUser(emailUser);
		if(u == null) {
			userMapper.insert(nameUser, emailUser, encodedPassword, getGroup());
			this.users = userMapper.get10User();
		}else {
			this.users = null;
		}
	}
		list = userMapper.getAll();
        this.list = list;
		return SUCCESS;
}

public String editUser() {

		User u = userMapper.getUserById(getId());
		String passworDB = u.getPassword();
		String encodedPassword = bCryptPasswordEncoder.encode(passwordUser);
		if(u != null ) {
			if(passwordUser == null) {
				userMapper.editUserNoPass(nameUser, emailUser, getGroup(), getActiveUser(), getId());
			}else {
				if(passwordUser.equalsIgnoreCase(repeatPasswordUser)) {
					userMapper.editUser(nameUser, emailUser, encodedPassword, getGroup(), getActiveUser(), getId());
				}
			}

		}
		list = userMapper.getAll();
        this.list = list;
		return SUCCESS;


}

	public String deleteUser() {
		userMapper.deleteUser(this.id.longValue());
		return SUCCESS;
		
	}
    public String deleteSearch() {
    	this.fullname = "";
    	this.email ="";

    	list = userMapper.getAll();
        this.list = list;
    	return SUCCESS;
    }

    public String pageUser() {
    	int total = userMapper.getByUsersList(fullname, email, getGroup(), getActive()).size();
    	List<User> nextList;
    	if(getPage()== 1) {
       	 	nextList = userMapper.getByUsers(fullname, email, getGroup(), getActive());
       	}else {
       		nextList = userMapper.getByUsersNext(fullname, email, getGroup(), getActive(), (getPage()-1)*10);
       		System.out.println("dữ liệu trang tiêp theo:" + nextList);
       	}
    	System.out.println("dữ liệu trang tiêp theo:" + nextList.size());

    	object.add(nextList);
    	object.add(total);
    	
    	this.object = object;
    	
    	System.out.println("Object: " + object);
    	System.out.println("data: " + nextList);
    	 list = userMapper.getAll();
    	 System.out.println("danh sách users:" + users);
//         this.list = list;
    	this.users = nextList;
    	System.out.println("danh sách usersEnd:" + users);
    	return SUCCESS;
    	
    }
    public String getUser() {
    		user1 =  userMapper.getByUser(this.email);	
    	return SUCCESS;
    }
    public String lockUnlockUser(){
    		 userMapper.lockUnlockUser(this.active, this.id);
    		 list = userMapper.getAll();
             this.list = list;
		return SUCCESS;
    }
}
