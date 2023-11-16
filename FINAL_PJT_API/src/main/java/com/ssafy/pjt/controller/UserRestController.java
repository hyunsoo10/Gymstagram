package com.ssafy.pjt.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.pjt.model.dto.User;
import com.ssafy.pjt.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user-api")
@Api(tags = "User 컨트롤러")
@CrossOrigin("*")
public class UserRestController {
	@Autowired
	UserService userService;
	
	//회원가입 시 아이디 중복체크할 때 활용
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
	//로그인할 때 활용
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

	//회원 가입
	@PostMapping("/user")
	@ApiOperation(value = "사용자 정보를 삽입한다.", response = Integer.class)
	public ResponseEntity<?> insert(User user) {
		try {
			int result = userService.addUser(user);
			return new ResponseEntity<Integer>(result, HttpStatus.CREATED);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}
	
	//회원 수정
	@PutMapping("/user")
	@ApiOperation(value = "사용자 정보를 수정한다.", response = Integer.class)
	public ResponseEntity<?> update(@RequestBody User user) {
		try {
			int result = userService.modifyUser(user);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}

	//회원탈퇴
	@DeleteMapping("/user/{userId}")
	@ApiOperation(value = "{userId} 에 해당하는 사용자 정보를 삭제한다.", response = Integer.class)
	public ResponseEntity<?> delete(@PathVariable String userId) {
		try {
			int result = userService.removeUser(userId);
			return new ResponseEntity<Integer>(result, HttpStatus.OK);

		} catch (Exception e) {
			return exceptionHandling(e);
		}
	}	
	
	@PostMapping("login")
	@ApiOperation(value = "로그인")
	public ResponseEntity<?> login(User user, HttpSession session) {
		String userId = user.getUserId();
		String password = user.getUserPassword();

		User dbUser = userService.getOneUser(userId);

		if (dbUser != null && dbUser.getUserPassword().equals(password)) {
			session.setAttribute("loginUser", dbUser.getUserName());
			return new ResponseEntity<String>("welcome, "+ dbUser.getUserId(), HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("login failed",HttpStatus.UNAUTHORIZED);
		}
	}
	@GetMapping("logout")
	@ApiOperation(value = "로그아웃")
	public ResponseEntity<Void> logout(HttpSession session) {
		session.invalidate();
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	//예외 처리 
	private ResponseEntity<String> exceptionHandling(Exception e) {
		e.printStackTrace();
		return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
}