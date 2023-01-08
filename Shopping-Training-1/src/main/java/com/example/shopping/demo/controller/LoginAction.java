package com.example.shopping.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.shopping.demo.mapper.UserMapper;
import com.example.shopping.demo.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.ParameterNameAware;

public class LoginAction extends ActionSupport implements SessionAware, ParameterNameAware, ServletResponseAware, ServletRequestAware{
	private static final long serialVersionUID = 1L;
    private String uname;
    private String password;
    private String massage = "";
    private List<User> users;
    private Map<String, Object> userSession ;
    private boolean checkRemember;
    private List<User> list;
    
    
    
    
   	public List<User> getList() {
		return list;
	}

	public void setList(List<User> list) {
		this.list = list;
	}

	public boolean isCheckRemember() {
		return checkRemember;
	}

	public void setCheckRemember(boolean checkRemember) {
		this.checkRemember = checkRemember;
	}

	public Map<String, Object> getUserSession() {
		return userSession;
	}

	public void setUserSession(Map<String, Object> userSession) {
		this.userSession = userSession;
	}

	public List<User> getUsers() {
   		return users;
   	}

   	public void setUsers(List<User> users) {
   		this.users = users;
   	}
    
  
    public String getMassage() {
		return massage;
	}

	public void setMassage(String massage) {
		this.massage = massage;
	}

	public String getUname() {
        return uname;
    }
 
    public void setUname(String uname) {
        this.uname = uname;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
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
	
	public String userView() {
		System.out.println("ttttttttttttttttttttt");
		return "SUCCESS";
	}
	
	public String checkLogin() {
		if(checkCookie() != null) {
			return SUCCESS;
		}
		return "login";
	}
	
//	@Override
	public String proccessLogin() {


			if(!validate(uname)) {
				this.massage = "errorMail";
				return "ERROR";
			}
			if(this.password.length() <3) {
				this.massage = "errorPass";
				return "ERROR";
			}
			User user = userMapper.getByUser(uname);
			String codePassword = user.getPassword();
			boolean encodedPassword = bCryptPasswordEncoder.matches(this.password, codePassword);
			
			System.out.println("mã hóa trong DB:" + codePassword);
			System.out.println("mã hóa dăng nhap:" + encodedPassword);
			
			if((this.uname.equals(user.getEmail())) && (encodedPassword== true)&& (user.getIs_active()==1)&& (user.getIs_delete() ==0)) {
				Map<String, Object> session = ActionContext.getContext().getSession();	
				session.put("USER", user.getUsename());

				userMapper.updateDateUser(user.getId());
				
				
				System.out.println("cccccccccccccc"+ checkRemember);
				String val = request.getParameter("checkRemember");
				System.out.println("vvvvvvvvvv" + val);
				if(val != null) {
					Cookie cookieRemember = new Cookie("remember", val);
					cookieRemember.setMaxAge(3600);
					response.addCookie(cookieRemember);
					Cookie cookieEmail = new Cookie("email", user.getEmail());
					cookieEmail.setMaxAge(3600);
					response.addCookie(cookieEmail);
				}
//				else {
//					list = userMapper.getAll();
//					 this.list = list;
//					 users = userMapper.get10User();
//					 this.users = users;
//					 LOG.info("Listing persons");
//					 
//					return "LoginUsersSS";
//				}
				 users = userMapper.get10User();
				 this.users = users;
//				getAll();
				return "SUCCESS";
		       }else if(user.getIs_active()==0) {
	    		   this.massage = "errorActive";
	    		   return "ERROR";
	    	   }else { 
		    	   this.massage = "errorAccount";
		    	   return "ERROR";
		       }
		}
		
	
	private String checkCookie() {
//		User use = null;
//		String email = "";
		if(request.getCookies() != null)
		for(Cookie ck : request.getCookies()) {
			if(ck.getName().equalsIgnoreCase("email")) {
				return ck.getValue();
			}
			
		}
//		if(!email.isEmpty() && !password.isEmpty()) {
//			use = new User( email, password);
//		}
		return null;
	}

	public String logout() {
		System.out.println("session" + userSession);
		userSession.remove("USER");
		User use = null;
		String login = "";
		for(Cookie ck : request.getCookies()) {
			if(ck.getName().equalsIgnoreCase("email")) {
				ck.setMaxAge(0);
				response.addCookie(ck);
			}
			
			if(ck.getName().equalsIgnoreCase("remember")) {
				ck.setMaxAge(0);
				response.addCookie(ck);
			}
		}
		
		return SUCCESS;
	}
	
	 public String getAll(){
		 System.out.println("llllllllll" + userSession.get("USER"));
		 	String sessionUser= (String) userSession.get("USER");
		 	System.out.println("usserSessionU" + sessionUser);
			if(sessionUser != null) {
				System.out.println("ccccccccccc");
				list = userMapper.getAll();
				 this.list = list;
				 users = userMapper.get10User();
				 this.users = users;
				 LOG.info("Listing persons");
				 return SUCCESS;
				
			}else if(checkCookie() != null) {
				for(Cookie ck : request.getCookies()) {
					if(ck.getName().equalsIgnoreCase("email")) {
						User u = userMapper.getByUser(ck.getValue());
						Map<String, Object> session = ActionContext.getContext().getSession();	
						session.put("USER", u.getName());
					}
					
				}
				System.out.println("ccccccccccc");
				list = userMapper.getAll();
				 this.list = list;
				 users = userMapper.get10User();
				 this.users = users;
				 LOG.info("Listing persons");
				 return SUCCESS;
			}else {
				System.out.println("kkkkkkkkkkkk");
				return "login";		 		
			}
	    }

	@Override
	public boolean acceptableParameterName(String parameterName) {
		boolean allowedParameterName = true ;
		
		if ( parameterName.contains("session")  || parameterName.contains("request") ) {
		
			allowedParameterName = false ;
			
		} 
		
		return allowedParameterName;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		userSession = session ;

		
	}
	
	protected HttpServletResponse response;

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
		// TODO Auto-generated method stub
		
	}

	protected HttpServletRequest request;
	@Override
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		this.request = request;
	}
}
