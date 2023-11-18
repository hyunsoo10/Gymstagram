package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.User;

public interface UserService {
	//전체 유저 목록 가져오기
	List<User> getAllUser();
	
	//유저 삽입(회원가입)
	int addUser(User user);
	
	//유저 정보 수정
	int modifyUser(User user);
	
	//유저 삭제(회원 탈퇴)
	int removeUser(String userId);
	
	//유저 상세 조회
	User getOneUser(String userId);

	// avty 코드 수정
	int modifyAvty(User user);
}
