package com.ssafy.pjt.model.dto;

public class Comment {
	private int commentId;
	private int diaryId;
	private String userId;
	private String nickName;
	private String writeDate;
	private String updateDate;
	/** 삭제 되더라도, 해당 댓글에 달린 대댓글은 표시될 수 있도록 DB에서 완전 삭제하지 않을 것임 */
	private boolean isDeleted;
	/**
	 * 대댓글일 경우 부모 comment의 Id정보를 담을 변수 값이 0일 경우엔 상위 댓글이 없음을 의미한다.
	 */
	private int parentComment;
	private String content;

	public Comment() {

	}

	public Comment(int diaryId, String userId, String writeDate, int parentComment, String content) {
		this.diaryId = diaryId;
		this.userId = userId;
		this.writeDate = writeDate;
		this.parentComment = parentComment;
		this.content = content;
	}

	public Comment(int diaryId, String userId, int parentComment, String content) {
		super();
		this.diaryId = diaryId;
		this.userId = userId;
		this.parentComment = parentComment;
		this.content = content;
	}

	public Comment(int commentId, String updateDate, boolean isDeleted, int parentComment, String content) {
		this.commentId = commentId;
		this.updateDate = updateDate;
		this.isDeleted = isDeleted;
		this.parentComment = parentComment;
		this.content = content;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
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

	public String getnickName() {
		return nickName;
	}

	public void setnickName(String nickName) {
		this.nickName =  nickName;
	}
	
	public String getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(String writeDate) {
		this.writeDate = writeDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public int getParentComment() {
		return parentComment;
	}

	public void setParentComment(int parentComment) {
		this.parentComment = parentComment;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "Comment [commentId=" + commentId + ", diaryId=" + diaryId + ", userId=" + userId + ", nickName="
				+ nickName + ", writeDate=" + writeDate + ", updateDate=" + updateDate + ", isDeleted=" + isDeleted
				+ ", parentComment=" + parentComment + ", content=" + content + "]";
	}

}
