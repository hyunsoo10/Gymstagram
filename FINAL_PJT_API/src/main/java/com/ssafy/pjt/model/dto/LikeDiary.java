package com.ssafy.pjt.model.dto;

public class LikeDiary {
	String userId;
	int diaryId;

	public LikeDiary() {
	}

	public LikeDiary(String userId, int diaryId) {
		super();
		this.userId = userId;
		this.diaryId = diaryId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getDiaryId() {
		return diaryId;
	}

	public void setDiaryId(int diaryId) {
		this.diaryId = diaryId;
	}

	@Override
	public String toString() {
		return "LikeDiary [userId=" + userId + ", diaryId=" + diaryId + "]";
	}

	
}
