package com.example.shopping.demo.controller;

import com.example.shopping.demo.mapper.UserMapper;
import com.example.shopping.demo.model.User;
import com.example.shopping.demo.utitls.PageUtitls;
import com.opensymphony.xwork2.ActionSupport;

import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
//	 private String carlist;
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
	 
	 

	 
	

	 

	public String getActiveUser() {
		return activeUser;
	}

	public void setActiveUser(String activeUser) {
		this.activeUser = activeUser;
	}

	public User getUser1() {
		return user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	 

   

	public List<User> getList() {
		return list;
	}

	public void setList(List<User> list) {
		this.list = list;
	}

	public String getNotification() {
		return notification;
	}

	public void setNotification(String notification) {
		this.notification = notification;
	}

	public String getGroups() {
		return groups;
	}

	public void setGroups(String groups) {
		this.groups = groups;
	}


	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getMassage() {
		return massage;
	}

	public void setMassage(String massage) {
		this.massage = massage;
	}


	public String getRepeatPasswordUser() {
		return repeatPasswordUser;
	}

	public void setRepeatPasswordUser(String repeatPasswordUser) {
		this.repeatPasswordUser = repeatPasswordUser;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameUser() {
		return nameUser;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}

	public String getEmailUser() {
		return emailUser;
	}

	public void setEmailUser(String emailUser) {
		this.emailUser = emailUser;
	}

	public String getPasswordUser() {
		return passwordUser;
	}

	public void setPasswordUser(String passwordUser) {
		this.passwordUser = passwordUser;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	private static final long serialVersionUID = 1L;
    private List<User> users;
    
    
    
	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
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
    
    public String getByUser() {
    
    	list = userMapper.getByUsersList(fullname, email, getGroup(), getActive());

    	List<User> nextList;
//    	if(getPage()== 1) {
//    	 nextList = userMapper.getByUsers(fullname, email, getGroup(), getActive());
//    	}else {
//    		nextList = userMapper.getByUsersNext(fullname, email, getGroup(), getActive(), (getPage()-1)*10);
//    		System.out.println("dữ liệu trang tiêp theo:" + nextList);
////    	 nextList = userMapper.getNextUser((getPage()-1)*10);
//    	}
//    	 list = userMapper.getAll();
         this.list = list;
//    	this.users = nextList;
    	
//    	users = userMapper.getByUsers(fullname, email, getGroup(), getActive(), getPage());
    	users = userMapper.getByUsersList(fullname, email, getGroup(), getActive());

    	this.email = email;
    	this.fullname = fullname;
    	this.groups = getGroups();
    	this.active = getActive();
    	if(users.size() >0) {
    		this.users = users;
    	}else {
    		this.users = users;
    		this.notification = "noFindUser";
    	}
//    	list = userMapper.getAll();
        this.list = list;
    	return SUCCESS;
    }
    
public String insertUser() {
	String encodedPassword = bCryptPasswordEncoder.encode(passwordUser);
	

	if(!validate(emailUser)) {
		this.massage = "errorMail";
		
		return "SUCCESS";
	}
	if(this.passwordUser.length() <3) {
		this.massage = "errorPass";
		
		return "SUCCESS";
	}
//	if(passwordUser.equalsIgnoreCase(repeatPasswordUser)) {
		User u = userMapper.getByUser(emailUser);
		if(u == null) {
			userMapper.insert(nameUser, emailUser, encodedPassword, getGroup());
//			getAllUser();
		}
//		getAllUser();
		list = userMapper.getAll();
        this.list = list;
		return SUCCESS;

//	}else {
////		getAllUser();
//		return ERROR;
//	}
}


public String editUser() {
//	if(!validate(emailUser)) {
//		this.massage = "errorMail";
//		getAllUser();
//		return "ERROR";
//	}
//	if(this.passwordUser.length() <3) {
//		this.massage = "errorPass";
//		getAllUser();
//		return "ERROR";
//	}
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
//		Long number = this.id.longValue();
		userMapper.deleteUser(this.id.longValue());
		
//		 getAll();
		return SUCCESS;
		
	}
    public String deleteSearch() {
    	this.fullname = "";
    	this.email ="";
    	getAllUser();
    	list = userMapper.getAll();
        this.list = list;
    	return SUCCESS;
    }
    public String getAllUser(){

    	users = userMapper.getByUsersList(fullname, email, getGroup(), getActive());

        this.users = users;

        list = userMapper.getByUsersList(fullname, email, getGroup(), getActive());
        this.list = list;
        LOG.info("Listing persons");
    	return SUCCESS;
    }
    public String userView() {
    	return SUCCESS;
    }
    
    public String pageUser() {
    	
    	
    	
    	
    	List<User> nextList;
    	System.out.println("số trang:" + fullname);
    	System.out.println("số trang:" + email);
    	System.out.println("số trang:" + getGroup());
    	System.out.println("số trang:" + getActive());
    	System.out.println("số trang:" + getPage());
    	if(getPage()== 1) {
       	 	nextList = userMapper.getByUsers(fullname, email, getGroup(), getActive());
       	}else {
       		nextList = userMapper.getByUsersNext(fullname, email, getGroup(), getActive(), (getPage()-1)*10);
       		System.out.println("dữ liệu trang tiêp theo:" + nextList);
//       	 nextList = userMapper.getNextUser((getPage()-1)*10);
       	}
    	System.out.println("dữ liệu trang tiêp theo:" + nextList.size());
//       	 if(getPage()== 1) {
//    	 nextList = userMapper.get10User();
//    	}else {
//    	 nextList = userMapper.getNextUser((getPage()-1)*10);
//    	}
    	System.out.println("data: " + nextList);
    	 list = userMapper.getAll();
         this.list = list;
    	this.users = nextList;
    	return SUCCESS;
    	
    }
    public String getUser() {
    	
    		user1 =  userMapper.getByUser(this.email);
    		
//    		byte[] result = user1.getPassword().getBytes();
//    		byte[] text = "[B@77ae3599".getBytes();
//    		byte[] decodeAccessKeyPin = org.apache.tomcat.util.codec.binary.Base64.decodeBase64(user1.getPassword());
//    		String rrr = org.apache.tomcat.util.codec.binary.Base64.encodeBase64String(text);
//    		String encode = org.apache.tomcat.util.codec.binary.Base64.encodeBase64String(text);
//    		System.out.println("encode: " + encode) ;
//    		byte[] decodeAccessKeyPin = org.apache.tomcat.util.codec.binary.Base64.decodeBase64(EMAIL_REGEX).decode(result);
//    		System.out.println("decodeAccessKeyPin:" + decodeAccessKeyPin);
    		
    	return SUCCESS;
    }
    public String lockUnlockUser(){
    		 userMapper.lockUnlockUser(this.active, this.id);
    		 list = userMapper.getAll();
             this.list = list;
		return SUCCESS;
    }
}
