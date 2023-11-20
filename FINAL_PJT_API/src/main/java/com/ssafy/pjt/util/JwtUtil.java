package com.ssafy.pjt.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.ssafy.pjt.model.dto.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	private static final String SALT = "CHSNSH";
	
	
	//토큰 생성 메서드
	public String createToken(String key, User user) throws UnsupportedEncodingException {
		return Jwts.builder()
				.setHeaderParam("alg", "HS256")
				.setHeaderParam("typ", "JWT") //헤더완료'
				.claim(key, user)
//				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
				.signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8")) //서명완료
				.compact();
	}
	
	//토큰 유효성 검사 메서드
	public void valid(String token) throws Exception {
		Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
	}


}