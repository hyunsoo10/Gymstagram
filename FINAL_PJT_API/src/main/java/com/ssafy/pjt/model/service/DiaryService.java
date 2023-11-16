package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.Comment;
import com.ssafy.pjt.model.dto.Diary;
import com.ssafy.pjt.model.dto.SearchCondition;

public interface DiaryService {
	//전체 다이어리 조회(with condition)
	List<Diary> getAllDiary(SearchCondition condition);
	
	//다이어리 1개 상세 조회 
	Diary getOneDiary(int diaryId);
	
	// my diary 전체 조회
	List<Diary> getMyDiary(String userId);
	
	// my weekly diary 조회
	// 이 부분은 그냥 front에서 computed로 조작하면될까?
	List<Diary> getMyWeeklyDiary(String userId);
	
	//다이어리 등록
	int addDiary(Diary diary);
	
	//다이어리 수정
	int modifyDiary(Diary diary);
	
	//다이어리 삭제
	int removeDiary(int diaryId);
	
	//댓글 등록
	int addComment(Comment comment);
	
	//Diary 댓글 조회
	List<Comment> getDiaryComments(int diaryId);
	
	//댓글 수정
	int modifyComment(Comment comment);
	
	//댓글 삭제
	int removeComment(int commentId);
	
	//전체 댓글 조회
	List<Comment>  getAllComment();
}
