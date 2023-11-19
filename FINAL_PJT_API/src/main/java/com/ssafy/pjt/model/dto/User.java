package com.ssafy.pjt.model.dto;

public class User {
	private String userId;
	private String userPassword;
	private String userName;
	private String nickName;
	private String registerDate;
	private String profileImage;
	
	/**사용중인 회원 : true, 비사용(비활성화 화원): false; **/
	boolean activate = true; 
	/**일반 유저: 0, vip유저 : 1, admin 유저: 2 **/
	int permission;
	int avtyCode;
	
	
	public User() {
		
	}
	
	 

	//로그인 객체 전달 할 때 필요한 생성자
	public User(String userId, String userPassword) {
		this.userId = userId;
		this.userPassword = userPassword;
	}




	public User(String userId, String userPassword, String userName, String nickName,
			String profileImage) {
		this.userId = userId;
		this.userPassword = userPassword;
		this.userName = userName;
		this.nickName = nickName;
		this.profileImage = profileImage;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getUserPassword() {
		return userPassword;
	}


	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getNickName() {
		return nickName;
	}


	public void setNickName(String nickName) {
		this.nickName = nickName;
	}


	public String getRegisterDate() {
		return registerDate;
	}


	public void setRegisterDate(String registerDate) {
		this.registerDate = registerDate;
	}


	public String getProfileImage() {
		return profileImage;
	}


	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}


	public boolean isActivate() {
		return activate;
	}


	public void setActivate(boolean activate) {
		this.activate = activate;
	}


	public int getPermission() {
		return permission;
	}


	public void setPermission(int permission) {
		this.permission = permission;
	}


	public int getAvtyCode() {
		return avtyCode;
	}


	public void setAvtyCode(int avtyCode) {
		this.avtyCode = avtyCode;
	}


	@Override
	public String toString() {
		return "User [userId=" + userId + ", userPassword=" + userPassword + ", userName=" + userName + ", nickName="
				+ nickName + ", registerDate=" + registerDate + ", profileImage=" + profileImage + ", activate="
				+ activate + ", permission=" + permission + ", avtyCode=" + avtyCode + "]";
	}

}
