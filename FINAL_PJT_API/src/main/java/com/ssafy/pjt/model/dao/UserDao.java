package com.ssafy.pjt.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ssafy.pjt.model.dto.User;

public interface UserDao {

	// 전체 유저 목록 가져오기
	List<User> selectAllUser();

	// 유저 삽입(회원가입)
	int insertUser(User user);

	// 유저 정보 수정
	int updateUser(User user);

	// 유저 삭제(회원 탈퇴)
	int deleteUser(String userId);

	// 유저 상세 조회
	User selectOneUser(String userId);

	// avty 코드 수정
	int updateAvty(User user);
	
	// 유저 활성화 비활성화
	int updateUserAct(String userId);

}
