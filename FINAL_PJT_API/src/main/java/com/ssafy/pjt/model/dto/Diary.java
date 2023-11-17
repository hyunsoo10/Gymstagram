package com.ssafy.pjt.model.dto;

public class Diary {
	private int diaryId;
	private String userId;
	private String createDate;
	private String originalImage;
	private String saveImage;
	private String title;
	private String content;
	private int viewCount;
	private int likeCount;
	/**0-public 1-친구공개 2-private*/
	private int range;
	private String avty;
	
	public Diary() {
	}


	public Diary(String userId, String originalImage, String saveImage, String title, String content) {
		super();
		this.userId = userId;
		this.originalImage = originalImage;
		this.saveImage = saveImage;
		this.title = title;
		this.content = content;
	}


	public int getDiaryId() {
		return diaryId;
	}


	public void setDiaryId(int diaryId) {
		this.diaryId = diaryId;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getCreateDate() {
		return createDate;
	}


	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}


	public String getOriginalImage() {
		return originalImage;
	}


	public void setOriginalImage(String originalImage) {
		this.originalImage = originalImage;
	}


	public String getSaveImage() {
		return saveImage;
	}


	public void setSaveImage(String saveImage) {
		this.saveImage = saveImage;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public int getViewCount() {
		return viewCount;
	}


	public void setViewCount(int viewCount) {
		this.viewCount = viewCount;
	}


	public int getLikeCount() {
		return likeCount;
	}


	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}


	public int getRange() {
		return range;
	}


	public void setRange(int range) {
		this.range = range;
	}
	

	public String getAvty() {
		return avty;
	}

	public void setAvty(String avty) {
		this.avty = avty;
	}


	@Override
	public String toString() {
		return "Diary [diaryId=" + diaryId + ", userId=" + userId + ", createDate=" + createDate + ", originalImage="
				+ originalImage + ", saveImage=" + saveImage + ", title=" + title + ", content=" + content
				+ ", viewCount=" + viewCount + ", likeCount=" + likeCount + ", range=" + range + "]";
	}



}
