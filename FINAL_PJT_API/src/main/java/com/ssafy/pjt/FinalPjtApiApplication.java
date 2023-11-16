package com.ssafy.pjt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.ssafy.pjt.model.dao" )
public class FinalPjtApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalPjtApiApplication.class, args);
	}

}
