package com.ssafy.pjt.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.pjt.model.dto.Comment;
import com.ssafy.pjt.model.dto.Diary;
import com.ssafy.pjt.model.dto.LikeDiary;
import com.ssafy.pjt.model.dto.SearchCondition;
import com.ssafy.pjt.model.service.DiaryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/diary-api")
@Api(tags = "Diary 컨트롤러")
@CrossOrigin("*")
public class DiaryRestController {

	@Autowired
	DiaryService diaryService;

	@Autowired
	ResourceLoader resLoader;

	// 등록된 다이어리 모두 반환 with 조건(public, private, avtyCode 등)
	@GetMapping("/diary")
	@ApiOperation(value = "등록된 모든 다이어리 게시물 반환", response = Diary.class)
	public ResponseEntity<?> selectAll(SearchCondition condition) {
		try {
			List<Diary> diaryList = diaryService.getAllDiary(condition);
			if (diaryList != null && diaryList.size() > 0) {
				return new ResponseEntity<List<Diary>>(diaryList, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@GetMapping("/mydiary/{userId}")
	@ApiOperation(value = "my diary반환", response = Diary.class)
	public ResponseEntity<?> selectAll(@PathVariable String userId) {
		try {
			List<Diary> diaryList = diaryService.getMyDiary(userId);
			if (diaryList != null && diaryList.size() > 0) {
				return new ResponseEntity<List<Diary>>(diaryList, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diaryId로 diary한개 가져오기
	@GetMapping("/diary/{diaryId}")
	@ApiOperation(value = "diaryId에 해당하는 diary 반환", response = Diary.class)
	public ResponseEntity<?> selectOne(HttpServletRequest req, HttpServletResponse res, HttpSession session,
			@PathVariable int diaryId) {
		try {
			// diary가져오기
			Diary diary = diaryService.getOneDiary(diaryId);
//			viewCountUp(req, res, session, diaryId);
			if (diary != null) {
				return new ResponseEntity<Diary>(diary, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@GetMapping("/diary/weekly/{userId}")
	@ApiOperation(value = "userId에 해당하는 weekly diary 반환", response = Diary.class)
	public ResponseEntity<?> selectWeeklyDiary(@PathVariable String userId) {
		try {
			// diary가져오기
			List<Diary> weeklyDiary = diaryService.getMyWeeklyDiary(userId);
			if (weeklyDiary != null) {
				return new ResponseEntity<List<Diary>>(weeklyDiary, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diary 추가
	@PostMapping(value = "/diary", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "새로운 diary추가")
	public ResponseEntity<?> insertOne(
			@RequestPart(required = false) @RequestParam(value = "image", required = false) MultipartFile file,
			@RequestPart("diary") Diary diary) {
//	public ResponseEntity<?> insertOne(@RequestBody Diary diary){
		try {
			// 결과 값 담을 변수
			int result = 0;
//			System.out.println(diary);
//			byte[] base64Img = Base64.decodeBase64(diary.getImage());
//			System.out.println(diary.getImage());
//			byte[] base64Img = Base64.getDecoder().decode(diary.getImage());
//			byte[] base64Img1 = org.apache.tomcat.util.codec.binary.Base64.decodeBase64(diary.getImage());
//			System.out.println(Arrays.toString(file.getBytes()));
//			System.out.println(diary);
//			System.out.println(Arrays.toString(base64Img));
//			System.out.println(Arrays.toString(base64Img1));
//			System.out.println(base64Img);
//			System.out.println(file);
//			LocalDateTime now = LocalDateTime.now();
//			DateTimeFormatter format = DateTimeFormatter.ofPattern("yyMMdd");
//			String formatDate = now.format(format);
			if (file != null && file.getSize() > 0) {
//				
////				// 파일을 저장할 폴더 지정
////				Resource res = resLoader.getResource("resources/upload");
////				// 파일이 비어있다면 처리할 필요가 없다.
////				// prefix를 포함한 전체 이름
////				movie.setImg(System.currentTimeMillis() + "_" + file.getOriginalFilename());
////				movie.setOrgImg(file.getOriginalFilename());
////
////				file.transferTo(new File(res.getFile().getCanonicalPath() + "/" + movie.getImg()));
//				
//				String fileName = file.getOriginalFilename();
				String uploadPath = "C:\\FINAL\\PJT-FINAL-I-CHS-NSH\\ssafy_final_project\\src\\assets\\diary_image\\"
						+ diary.getUserId();
//				String uploadPath = "C:\\uploadTemp\\";
				String saveName = UUID.randomUUID() + "_" + diary.getOriginalImage();
//				
				File target = new File(uploadPath, saveName);

				if (!new File(uploadPath).exists()) {
					new File(uploadPath).mkdirs();
				}

				try {
					FileCopyUtils.copy(file.getBytes(), target);
					diary.setSaveImage(saveName);
//					Files.write(target, base64Img);
					result = diaryService.addDiary(diary);
				} catch (IOException e) {
					e.printStackTrace();
				}
			} else {
				// 파일이 없으면
				result = diaryService.addDiary(diary);
			}
//			Diary diary = null;
			if (result > 0) {
				return new ResponseEntity<Diary>(diary, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diary 수정
	@PutMapping(value = "/diary", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "diary 수정", response = Diary.class)
	public ResponseEntity<?> updateOne(
			@RequestPart(required = false) @RequestParam(value = "image", required = false) MultipartFile file,
			@RequestPart("diary") Diary diary) {

		try {
			// 결과 값 담을 변수
			int result = 0;
			if (file != null && file.getSize() > 0) {

				String uploadPath = "C:\\FINAL\\PJT-FINAL-I-CHS-NSH\\ssafy_final_project\\src\\assets\\diary_image\\"
						+ diary.getUserId();
				String saveName = UUID.randomUUID() + "_" + diary.getOriginalImage();
				File target = new File(uploadPath, saveName);

				if (!new File(uploadPath).exists()) {
					new File(uploadPath).mkdirs();
				}

				try {
					FileCopyUtils.copy(file.getBytes(), target);
					diary.setSaveImage(saveName);
					result = diaryService.modifyDiary(diary);
				} catch (IOException e) {
					e.printStackTrace();
				}
			} else {
				// 파일이 없으면
				result = diaryService.modifyDiary(diary);
			}
			if (result > 0) {
				return new ResponseEntity<Diary>(diary, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diary 삭제
	@DeleteMapping("/diary/{diaryId}")
	@ApiOperation(value = "diaryId로 diary삭제", response = Diary.class)
	public ResponseEntity<?> deleteOne(@PathVariable int diaryId) {
		try {
			int result = diaryService.removeDiary(diaryId);
			if (result > 0) {
				return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diary 좋아요
	@PostMapping("diary/like")
	@ApiOperation(value = "diary 좋아요")
	public ResponseEntity<?> likeDiary(@RequestBody LikeDiary likeDiary) {
		try {
			int result = diaryService.like(likeDiary);
			int result1 = diaryService.increaseLikeCount(likeDiary.getDiaryId());
			if (result > 0 && result1 > 0) {
				System.out.println(likeDiary.getDiaryId());
				return new ResponseEntity<String>("좋아요 성공", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}

	}

	// diary 좋아요 해제
	@DeleteMapping("diary/like")
	@ApiOperation(value = "diary 좋아요 해제")
	public ResponseEntity<?> unLikeDiary(@RequestBody LikeDiary likeDiary) {
		try {
			int result = diaryService.unLike(likeDiary);
			int result1 = diaryService.decreaseLikeCount(likeDiary.getDiaryId());
			if (result > 0 && result1 > 0) {
				return new ResponseEntity<String>("좋아요 해제", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return exceptionHandling(e);
		}

	}

	// diaryId와 userId 로 다이어리 좋아요 여부 체크
	@GetMapping("diary/like/{userId}/{diaryId}")
	@ApiOperation(value = "diary좋아요 여부 확인 diaryId와 userId와 일치하는 목록 있는지 체크")
	public ResponseEntity<?> likeList(@PathVariable(value = "userId") String userId,
			@PathVariable(value = "diaryId") int diaryId) {
		try {
			LikeDiary likeDiary = new LikeDiary();

			likeDiary.setUserId(userId);
			likeDiary.setDiaryId(diaryId);
//			System.out.println(likeDiary);
			int result = diaryService.getLikeDiary(likeDiary);
			if (result == 1) {
				return new ResponseEntity<Integer>(1, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return exceptionHandling(e);
		}

	}

	// diary like 테이블 전체 조회
	@GetMapping("diary/like")
	@ApiOperation(value = "diary like 테이블 전체 조회")
	public ResponseEntity<?> likeList() {
		try {

			List<LikeDiary> likeList = diaryService.getAllLike();
			if (!likeList.isEmpty()) {
				return new ResponseEntity<List<LikeDiary>>(likeList, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return exceptionHandling(e);
		}

	}

	// diary에 해당하는 comment 불러오기
	@GetMapping("/diary/comment/{diaryId}")
	@ApiOperation(value = "diaryId에 해당하는 comment 조회", response = Diary.class)
	public ResponseEntity<?> selectComment(@PathVariable int diaryId) {
		try {
			List<Comment> commentList = diaryService.getDiaryComments(diaryId);
			if (commentList != null && commentList.size() > 0) {
				return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// diary에 comment 추가
	@PostMapping("/diary/comment")
	@ApiOperation(value = "diaryId에 해당하는 comment 추가")
	public ResponseEntity<?> insertComment(@RequestBody Comment comment) {
		try {
			int result = diaryService.addComment(comment);
			if (result > 0) {
				return new ResponseEntity<String>("추가 성공", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// comment 수정
	@PutMapping("/diary/comment")
	@ApiOperation(value = "comment 수정", response = Diary.class)
	public ResponseEntity<?> deleteComment(@RequestBody Comment comment) {
		try {
			int result = diaryService.modifyComment(comment);
			if (result > 0) {
				return new ResponseEntity<String>("수정 성공", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// comment 삭제
	@DeleteMapping("/diary/comment/{commentId}")
	@ApiOperation(value = "comment 삭제", response = Diary.class)
	public ResponseEntity<?> deleteComment(@PathVariable int commentId) {
		try {
			int result = diaryService.removeComment(commentId);
			if (result > 0) {
				return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 전체 comment 불러오기
	@GetMapping("/diary/comment/")
	@ApiOperation(value = "전체 comment 조회", response = Diary.class)
	public ResponseEntity<?> selectAllComment() {
		try {
			List<Comment> commentList = diaryService.getAllComment();
			if (commentList != null && commentList.size() > 0) {
				return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 조회수 증가
//    private void viewCountUp(HttpServletRequest req, HttpServletResponse res, HttpSession session,  int diaryId) {
//
//        Cookie oldCookie = null;
//        User user = (User) session.getAttribute("loginUser");
//        Cookie[] cookies = req.getCookies();
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if (cookie.getName().equals("diaryView")) {
//                    oldCookie = cookie;
//                }
//            }
//        }
//
//        if (oldCookie != null) {
//            if (!oldCookie.getValue().contains("[" + user.getUserId() + "]")) {
//                diaryService.updateViewCount(diaryId);
//                oldCookie.setValue(oldCookie.getValue() + "_[" + user.getUserId() + "]");
//                oldCookie.setPath("/");
//                oldCookie.setMaxAge(60 * 60 * 24);
//                res.addCookie(oldCookie);
//            }
//            System.out.println("oldCookie 있어");
//        } else {
//        	diaryService.updateViewCount(diaryId);
//            Cookie newCookie = new Cookie("diaryView","[" + user.getUserId() + "]");
//            newCookie.setPath("/");
//            newCookie.setMaxAge(60 * 60 * 24);
//            res.addCookie(newCookie);
//            System.out.println("oldCookie 없으니까 쿠키 생성해");
//        }
//    }
//	

	// 예외 처리
	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
