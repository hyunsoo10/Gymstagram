package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.User;

public interface UserDao {
	
	//전체 유저 목록 가져오기
	List<User> selectAllUser();
	
	//유저 삽입(회원가입)
	int insertUser(User user);
	
	//유저 정보 수정
	int updateUser(User user);
	
	//유저 삭제(회원 탈퇴)
	int deleteUser(String userId);
	
	//유저 상세 조회
	User selectOneUser(String userId);
	
	
	
}
