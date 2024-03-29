package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.Comment;
import com.ssafy.pjt.model.dto.Diary;
import com.ssafy.pjt.model.dto.LikeDiary;
import com.ssafy.pjt.model.dto.SearchCondition;

public interface DiaryDao {
	
	//전체 다이어리 조회(with condition)
	List<Diary> selectAllDiary(SearchCondition condition);
	
	//다이어리 1개 상세 조회 
	Diary selectOneDiary(int diaryId);
	
	// my diary 전체 조회
	List<Diary> selectMyDiary(String userId);
	
	// my weekly diary 조회
	// 이 부분은 그냥 front에서 computed로 조작하면될까?
	List<Diary> selectMyWeeklyDiary(String userId);
	
	//다이어리 등록
	int insertDiary(Diary diary);
	
	//다이어리 수정
	int updateDiary(Diary diary);
	
	//다이어리 삭제
	int deleteDiary(int diaryId);
	
	//댓글 등록
	int insertComment(Comment comment);
	
	//Diary 댓글 조회
	List<Comment> selectDiaryComments(int diaryId);
	
	//댓글 수정
	int updateComment(Comment comment);
	
	//댓글 삭제
	int deleteComment(int commentId);
	
	//전체 댓글조회
	List<Comment> selectAllComment();
	
	//대댓글 조회
	List<Comment> selectSubComment(int commentId);
	
	//조회수 증가
	void updateDiaryViewCount(int diaryId);
	
	//다이어리 좋아요
	int like(LikeDiary like);
	

	//다이어리 좋아요 해제
	int unLike(LikeDiary like);
	
	//다이어리 좋아요 여부 확인
	int selectLike(LikeDiary like);
	
	List<LikeDiary> selectAllLike();

	// 좋아요 수 증가
	int increaseLikeCount(int diaryId);
	
	// 좋아요 수 감소
	int decreaseLikeCount(int diaryId);
	
	//대댓글 있는 경우 DB에서 삭제하지 않고 isDeleted변수를 true로 만든다
	int unComment(int commentId);

	
}
