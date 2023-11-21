package com.ssafy.pjt.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ssafy.pjt.util.JwtUtil;

@Component
public class JwtInterceptor implements HandlerInterceptor{
	private static final String HEADER_AUTH = "access-token";
	
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		if(request.getMethod().equals("OPTIONS"))
			return true;
		
		
		String token = request.getHeader(HEADER_AUTH);
		
		if(token != null) {
			jwtUtil.valid(token);
			System.out.println("valid token: " + token );
			return true;
		}
		System.out.println("invalid token: " + token);
		System.out.println("접근 불가능");
		return false;
//		throw new Exception("접근할 수 없습니다.");
		
	}
	
	
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		
//		try {
//			
//			if(request.getMethod().equals("OPTIONS"))
//				return true;
//			
//				
//			String token = request.getHeader(HEADER_AUTH);
//			
//			System.out.println(token);
//		
//			if(token != null) {
//				jwtUtil.valid(token);
//				return true;
//			}else {
//				System.out.println("접근 불가능");
//			}
//			
//		} catch(Exception e) {
//			System.out.println("접근 불가능");
//			 AccessException(e);
//			 
//		}
//		return false;
//		
//	}
//	private ResponseEntity<String> AccessException(Exception e) {
//		e.printStackTrace();
//		System.out.println("접근할 수 없습니다");
//		return new ResponseEntity<String>("Sorry: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//	}
}