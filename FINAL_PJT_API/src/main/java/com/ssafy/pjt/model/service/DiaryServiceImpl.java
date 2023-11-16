package com.ssafy.pjt.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.pjt.model.dao.DiaryDao;
import com.ssafy.pjt.model.dto.Comment;
import com.ssafy.pjt.model.dto.Diary;
import com.ssafy.pjt.model.dto.SearchCondition;

@Service
public class DiaryServiceImpl implements DiaryService{
	
	@Autowired
	DiaryDao diaryDao;

	@Override
	public List<Diary> getAllDiary(SearchCondition condition) {
		return diaryDao.selectAllDiary(condition);
	}

	@Override
	public Diary getOneDiary(int diaryId) {
		return diaryDao.selectOneDiary(diaryId);
	}

	@Override
	public List<Diary> getMyDiary(String userId) {
		return diaryDao.selectMyDiary(userId);
	}

	@Override
	public List<Diary> getMyWeeklyDiary(String userId) {
		return diaryDao.selectMyWeeklyDiary(userId);
	}

	@Override
	public int addDiary(Diary diary) {
		return diaryDao.insertDiary(diary);
	}

	@Override
	public int modifyDiary(Diary diary) {
		return diaryDao.updateDiary(diary);
	}

	@Override
	public int removeDiary(int diaryId) {
		return diaryDao.deleteDiary(diaryId);
	}

	@Override
	public int addComment(Comment comment) {
		return diaryDao.insertComment(comment);
	}

	@Override
	public List<Comment> getDiaryComments(int diaryId) {
		return diaryDao.selectDiaryComments(diaryId);
	}

	@Override
	public int modifyComment(Comment comment) {
		return diaryDao.updateComment(comment);
	}

	@Override
	public int removeComment(int commentId) {
		return diaryDao.deleteComment(commentId);
	}

	@Override
	public List<Comment>  getAllComment() {
		return diaryDao.selectAllComment();
	}

}
