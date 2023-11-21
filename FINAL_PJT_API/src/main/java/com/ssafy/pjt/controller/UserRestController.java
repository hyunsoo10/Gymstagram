package com.ssafy.pjt.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.ssafy.pjt.model.dto.User;
import com.ssafy.pjt.model.service.UserService;
import com.ssafy.pjt.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user-api")
@Api(tags = "User 컨트롤러")
@CrossOrigin("*")
public class UserRestController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private static final String WRONGPASSWORD = "비밀번호가 틀렸습니다.";
	private static final String NOFOUNDID = "해당 ID와 일치하는 정보가 없습니다.";
	
	@Autowired
	UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;

	// 회원가입 시 아이디 중복체크할 때 활용
	@GetMapping("/user")
	@ApiOperation(value = "등록된 모든 사용자 정보를 반환한다.", response = User.class)
	public ResponseEntity<?> selectAll() {
		try {
			List<User> users = userService.getAllUser();
			if (users != null && users.size() > 0) {
				return new ResponseEntity<List<User>>(users, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 로그인할 때 활용
	@GetMapping("/user/{userId}")
	@ApiOperation(value = "{userId}에 해당하는 사용자 정보를 반환한다.", response = User.class)
	public ResponseEntity<?> select(@PathVariable String userId) {
		try {
			User user = userService.getOneUser(userId);
			if (user != null) {
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 회원 가입
	@PostMapping(value = "/user", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "회원가입", response = Integer.class)
	public ResponseEntity<?> insert(
			@RequestPart(required = false) @RequestParam(value = "image", required = false) MultipartFile file,
			@RequestPart("user") User user) {
		try {
			// 결과 값을 담을 변수(잘 등록되었는지 확인)
			int result = 0;
			if (file != null && file.getSize() > 0) {
				String uploadPath = "C:\\FINAL\\PJT-FINAL-I-CHS-NSH\\ssafy_final_project\\src\\assets\\user_image\\"
						+ user.getUserId();
				String saveName = UUID.randomUUID() + "_" + user.getProfileImage();

				File target = new File(uploadPath, saveName);

				// 파일을 저장할 경로가 없으면 생성해주기
				if (!new File(uploadPath).exists())
					new File(uploadPath).mkdirs();

				try {
					FileCopyUtils.copy(file.getBytes(), target);
					user.setProfileImage(saveName);
					result = userService.addUser(user);
				} catch (IOException e) {
					e.printStackTrace();
				}
				// 파일이 없으면
			} else {
				result = userService.addUser(user);
			}

			if (result > 0) {
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// avty 결과 반영
	@PutMapping(value = "/user/{userId}")
	@ApiOperation(value = "avty코드 수정", response = Integer.class) 
	public ResponseEntity<?> updateAvty(@RequestBody User user) {
		int result = userService.modifyAvty(user);
		
		if (result > 0) {
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} else
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
	}

	// 회원 수정
	@PutMapping(value = "/user", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "회원 정보 수정", response = Integer.class)
	public ResponseEntity<?> update(
			@RequestPart(required = false) @RequestParam(value = "image", required = false) MultipartFile file,
			@RequestPart("user") User user) {

		try {
			// 결과 값을 담을 변수(잘 등록되었는지 확인)
			int result = 0;
			if (file != null && file.getSize() > 0) {
				String uploadPath = "C:\\FINAL\\PJT-FINAL-I-CHS-NSH\\ssafy_final_project\\src\\assets\\user_image\\"
						+ user.getUserId();
				String saveName = UUID.randomUUID() + "_" + user.getProfileImage();

				File target = new File(uploadPath, saveName);

				// 파일을 저장할 경로가 없으면 생성해주기
				if (!new File(uploadPath).exists())
					new File(uploadPath).mkdirs();

				try {
					FileCopyUtils.copy(file.getBytes(), target);
					user.setProfileImage(saveName);
					result = userService.modifyUser(user);
				} catch (IOException e) {
					e.printStackTrace();
				}
				// 파일이 없으면
			} else {
				result = userService.modifyUser(user);
			}

			if (result > 0) {
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} else
				return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	// 회원탈퇴
	@DeleteMapping("/user/{userId}")
	@ApiOperation(value = "{userId} 회원 탈퇴", response = Integer.class)
	public ResponseEntity<String> delete(@PathVariable String userId) {
		try {
			int result = userService.removeUser(userId);
			if(result > 0) return new ResponseEntity<String>("회원탈퇴에 성공했습니다.", HttpStatus.OK);
			else return new ResponseEntity<String>("회원 탈퇴에 실패했습니다", HttpStatus.NOT_ACCEPTABLE);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	// 회원 비활성화 / 활성화
	@PutMapping("/user/activate/{userId}")
	@ApiOperation(value = "{userId} 회원 활성화 상태 변화")
	public ResponseEntity<String> changeActivate(@PathVariable String userId) {
		try {
			int result = userService.updateUserAct(userId);
			if(result > 0) {
				User user = (User) userService.getOneUser(userId);
				if(user.isActivate())
					return new ResponseEntity<String>("계정이 활성화 되었습니다.", HttpStatus.OK);
				else
					return new ResponseEntity<String>("계정이 비활성화 되었습니다.", HttpStatus.OK);
				
			}
			return new ResponseEntity<String>("계정 상태 변경에 실패했습니다.", HttpStatus.NOT_MODIFIED);
		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	@PostMapping("/user/login")
	@ApiOperation(value = "로그인")
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
		String userId = user.getUserId();
		String password = user.getUserPassword();

		User dbUser = userService.getOneUser(userId);

		if (dbUser != null && dbUser.getUserPassword().equals(password)) {
			session.setAttribute("loginUser", dbUser.getUserName());
			return new ResponseEntity<String>("welcome, " + dbUser.getUserId(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("login failed", HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@PostMapping("/user/jwtlogin")
	@ApiOperation(value = "로그인 with Jwt 토큰인증")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
		Map<String, Object> result = new HashMap<String, Object>();
		System.out.println("백앤드로 넘어오는 유저 정보 : " + user);
		HttpStatus status = null;
		try {
			//로그인 시도 user 객체의 ID와 비밀번호에 해당하는 user정보가 있는지 DB에서 검사
			String userId = user.getUserId();
			String password = user.getUserPassword();

			User dbUser = userService.getOneUser(userId);
			
			
			//아이디가 있다면
			if(dbUser != null) {
				//비밀번호까지 일치한다면
				if (dbUser.getUserPassword().equals(password)) {
					//나머지 필요한 정보 담아주기
					user.setAvtyCode(dbUser.getAvtyCode());
					user.setNickName(dbUser.getNickName());
					user.setProfileImage(dbUser.getProfileImage());
					user.setRegisterDate(dbUser.getRegisterDate());
					user.setUserName(dbUser.getUserName());
					user.setActivate(dbUser.isActivate());
					user.setEmail(user.getEmail());
					//세션 스토리지에 유저의 비밀번호를 저장하고 싶지 않을 때 읨의로 set해서 프론트쪽에 보낼 수 있다
//					user.setUserPassword("TOP-SECRET");
					user.setUserPassword(dbUser.getUserPassword());
					System.out.println("프론트로 넘길 유저 정보 : " +user);
					
					result.put("access-token", jwtUtil.createToken("user", user));
					
					result.put("message", SUCCESS);
					status = HttpStatus.ACCEPTED;
				}else {
					//아이디는 맞았지만 비밀번호가 틀렸다면
					result.put("message", WRONGPASSWORD);
					status = HttpStatus.OK;
				}
			}
			else {
				//해당하는 ID를 찾을 수 없다면
				result.put("message", NOFOUNDID);
				status = HttpStatus.OK;
			}
		} catch (UnsupportedEncodingException e) {
			result.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		return new ResponseEntity<Map<String,Object>>(result, status);
	}

	@GetMapping("logout")
	@ApiOperation(value = "로그아웃")
	public ResponseEntity<Void> logout(HttpSession session) {
		session.invalidate();

		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// 예외 처리
	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
