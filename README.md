# 📄  FINAL PROJECT


### SSAFY 10th 1학기 최종 관통 프로젝트

#### 주제:  AVTY(운동 성향) 테스트와 운동 다이어리 📒

<br/>
<br/>

## 👐 팀원 구성 및 역할 분담👐

<table align="center">
    <tr align="center">
        <td style="min-width: 250px;">
            <a href="https://github.com/hyunsoo10">
              <img src="https://avatars.githubusercontent.com/u/139304756?v=4" width="100">
              <br />
              <b>조현수(팀장)</b>
            </a> 
        </td>
        <td style="min-width: 250px;">
            <a href="https://github.com/se2develop">
              <img src="https://avatars.githubusercontent.com/u/139305078?v=4" width="100">
              <br />
              <b>노세희</b>
            </a>
        </td>
    </tr>
    <tr align="left">
        <td>
        0. 🙋 Back-end / Front-end<br> 
        1. Dto / Dao / Controller / Service 구현 <br>
        2. Diary 등록 / 조회 / 수정 / 삭제 <br>
        3. DB 모델링 <br>
        4. 유튜브 API활용 음악 재생 기능 <br>
        5. 대댓글 작성 및 삭제된 댓글 기능  <br>
        6. Jwt 토큰 인증 방식 로그인 및 카카오 로그인 <br>
        7. 이미지 업로드 with Drag & Drop  <br>
        8. 사용자 비활성화 / 활성화 <br>
        9. 게시물 좋아요 기능 <br>
        10. 게시물 검색 조회 기능 <br>
        <br/>
        </td>
        <td>
        0. 🙋Front-end / Back-end<br>
        1. Mapper.xml 작성 <br>
        2. User 등록  / 조회 / 수정 / 삭제 <br>
        3. DB 모델링 <br>
        4. 날씨 API / 카카오맵 API 활용 날씨 카드 <br>
        5. AVTY 테스트 진행 및 결과 화면 <br>
        6. V- Calendar 활용한 Diary 조회<br>
        7. 유저 프로필 기능 및 화면 <br>
        8. DB 예시 데이터 작성 <br>
        <br/>
        </td>
    </tr>
</table>

<br/>
<br/>

<div align=left><h2>📚TECH STACKS</h2></div>

<div align=center> 
  <img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <br>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java logoColor=white"> 
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
  <br>


  <img src="https://img.shields.io/badge/vuetify-339AF0?style=for-the-badge&logo=vuetify&logoColor=#1867C0">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>

##  🎯프로젝트 목표

###### 🔆 웹 아키텍처를 이해하고 이를 활용하여 웹 프로젝트를 설계하고 구현할 수 있다.
###### 🔆  SpringBoot와 Vue를 이해하고 활용할 수 있다.
###### 🔆  Rest API와 Vue Router를 활용하여 SPA 방식으로 프로젝트를 구성할 수 있다.
###### 🔆  기존 관통 프로젝트에 새로운 아이디어를 추가하여 과정에서 배운 기술들을 다양하게 구현해 본다.

<br/>
<br/>

# 설계서

## 📌 요구사항

- Spring Boot와 MyBatis 연동을 활용한 Rest API 서버 구현
- Vue3 버전을 활용한 SPA 클라이언트 구현

> ✅ : 구현 완료  ❌ : 미구현

#### 1️⃣ 기본기능 ✅

- 회원가입 / 회원탈퇴 ✅
- 로그인 / 로그아웃 ✅
- 다이어리 작성 / 조회 / 수정 / 삭제 ✅
- 댓글 작성 / 조회 / 수정 / 삭제 ✅
- AVTY 퀴즈 진행 및 결과 반영 ✅
- My Diary 페이지 ✅

#### 2️⃣ 추가기능 ✅

- Diary 좋아요 ✅
- Weekly Diary 조회 ✅
- 이미지 업로드 ✅
- Diary AVTY 기준 조회✅
- Youtube API 음악 재생 ✅
- Apex Charts로 AVTY 비율 차트 보여주기 ✅

#### 3️⃣ 심화기능
- 이미지 업로드 Drag & Drop ✅
- 카카오 로그인 ✅
- 대댓글 ✅
- 유저 계정 활성화 / 비활성화 ✅
-  v-calendar 로 diary 조회 ✅
- 기상청 API 와 Kakao Map API 활용한 날씨 카드 ✅


## 📌 유즈케이스 다이어그램

## 📌 테이블 구조도(ERD)
<img src="README_IMG/ERD.png">

## 📌 클래스 다이어그램
<img src="README_IMG/class_diagram.png">

## 📌 화면 설계서 (Figma)




# 소스코드 및 DB 스크립트

## 📌 백엔드

📂 **<u>폴더 구조</u>**
```
📂 FINAL_PJT_API
  ㄴ 📂 src\main\java
      ㄴ 📂 com\ssafy\pjt
          ㄴ 📄 FinalPjtApiApplication.java
          ㄴ 📂 config
              ㄴ 📄 SwaggerConfig.java
              ㄴ 📄 WebConfig.java
          ㄴ 📂 controller
              ㄴ 📄 DiaryRestController.java
              ㄴ 📄 UserRestController.java
          ㄴ 📂 interceptor
              ㄴ 📄 JwtInterceptor.java
          ㄴ 📂 model
              ㄴ 📂 dao
                  ㄴ 📄 DiaryDao.java
                  ㄴ 📄 UserDao.java
              ㄴ 📂 dto
                  ㄴ 📄 Comment.java
                  ㄴ 📄 Diary.java
                  ㄴ 📄 LikeDiary.java
                  ㄴ 📄 SearchCondition.java
                  ㄴ 📄 User.java
              ㄴ 📂 service
                  ㄴ 📄 DiaryService.java
                  ㄴ 📄 DiaryServiceImpl.java
                  ㄴ 📄 UserService.java
                  ㄴ 📄 UserServiceImpl.java
  ㄴ 📂 src\main\resources
      ㄴ 📂 mappers
          ㄴ 📄 diaryMapper.java
          ㄴ 📄 userMapper.java
      ㄴ 🍃 application.properties

```

## 📌 프론트

📂 **<u>폴더 구조</u>**
```

```

## 📌 DB

### schema.sql
```sql
CREATE DATABASE IF NOT EXISTS ssafy_final;

USE ssafy_final;

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `diary`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `avty`;
DROP TABLE IF EXISTS `likeDiary`;


CREATE TABLE IF NOT EXISTS `user`(
  `user_id` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
  `user_password` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
  `user_name` CHAR(10) CHARACTER SET utf8mb4 NOT NULL,
  `email` VARCHAR(45) CHARACTER SET utf8mb4,
  `nickname` VARCHAR(30) CHARACTER SET utf8mb4 NOT NULL,
  `register_date` DATE NOT NULL DEFAULT (current_date),
  `profile_image` VARCHAR(150),
  `activate` BOOLEAN NOT NULL DEFAULT true,
  `permission` INT NOT NULL DEFAULT 0,
  `avty_code` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `diary`(
  `diary_id` INT AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
  `create_date` TIMESTAMP DEFAULT now(),
  `save_image` VARCHAR(150),
  `original_image` VARCHAR(50),
  `title` VARCHAR(45) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `content` LONGTEXT CHARACTER SET utf8mb4 NOT NULL,
  `view_count` INT(52) DEFAULT 0,
  `like_count` INT(52) DEFAULT 0,
  `range` INT(2) DEFAULT 0,
  `update_date` TIMESTAMP,
  CONSTRAINT `diary_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  PRIMARY KEY (`diary_id`)
);

CREATE TABLE IF NOT EXISTS `comment`(
  `comment_id` INT(52) AUTO_INCREMENT NOT NULL,
  `diary_id` INT NOT NULL,
  `user_id` VARCHAR(45) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `content` VARCHAR(200) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `write_date` TIMESTAMP DEFAULT now(),
  `update_date` TIMESTAMP,
  `is_deleted` BOOLEAN NOT NULL DEFAULT false,
  `parent_comment` INT(52) NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`diary_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `avty`(
  `avty_code` INT NOT NULL,
  `avty_name` CHAR(5) CHARACTER SET utf8mb4 NOT NULL,
   PRIMARY KEY (`avty_code`)
);

CREATE TABLE IF NOT EXISTS `likeDiary`(
  `user_id` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
  `diary_id` INT NOT NULL,
  PRIMARY KEY (`user_Id`, `diary_Id`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`diary_Id`) REFERENCES `diary` (`diary_Id`) ON DELETE CASCADE
);
```

### data.sql

```sql
USE ssafy_final;

-- 더미 데이터

INSERT INTO `avty`VALUES
(0, 'ENJ'),
(1, 'ENP'),
(2, 'ESJ'),
(3, 'ESP'),
(4, 'INJ'),
(5, 'INP'),
(6, 'ISJ'),
(7, 'ISP'),
(8, '해당없음');

INSERT INTO `user` (`user_id`, `user_password`, `user_name`, `nickname`, `avty_code`, `profile_image`) 
VALUES
('ssafy', '1q2w3e4r!', '조현수', '갓현수', 0, 'profile.png'),
('dhwlgP', '1q2w3e4r!', '오지혜', '헤일리1', 0, 'profile.png'),
('rnjsdbrud', '1q2w3e4r!', '권유경', 'K유경', 6, 'profile.png'),
('rlaskawns', '1q2w3e4r!', '김남준', '올리버쌤', 7, 'profile.png'),
('rlaqudgus', '1q2w3e4r!', '김병현', '팬티도둑', 7, 'profile.png'),
('rlatjsdud', '1q2w3e4r!', '김선영', '첫째딸', 6, 'profile.png'),
('rladudtjq', '1q2w3e4r!', '김영섭', '반려견', 5, 'profile.png'),
('rladPfla', '1q2w3e4r!', '김예림', '주인', 7, 'profile.png'),
-- 중략

INSERT INTO `diary` (`diary_id`,`user_id`,`create_date`,`save_image`,`original_image`,`title`,`content`,`view_count`,`like_count`,`range`,`update_date`) 
VALUES 
    (1,'ssafy','2023-11-01 09:01:22','01.jpg','01','오운완 인증!','오늘 운동 너무 힘들었는데 열심히 했어요 !! 앞으로 더 열심히 운동해서 몸짱이 될거야,,!',0,0,0,NULL),
    (2,'ssafy','2023-11-02 10:11:23','02.jpg','02','오늘의 거울샷','운동하고 나서 거울에서 사진 찍어두기! 헬스장에 사람이 별로 없었다 ~~',0,0,0,NULL),
    (3,'ssafy','2023-11-03 22:13:45','03.jpg','03','조명찾아 삼만리','화장실 조명에서 찍으니까 어제보다 근육이 잘 보이는 것 같기도,, 아닌가?',0,0,0,NULL),
    (4,'ssafy','2023-11-04 09:03:45','04.jpg','04','재밌는 헬스','사실은 넘 어려웡 ㅠ 하지만 포기란 배추 셀 때나 하는 이야기야 포기하지 않고 끝까지 아자아자',0,0,0,NULL),
    (5,'ssafy','2023-11-05 09:10:22','05.jpg','05','크로스핏 체험','윤성빈 선수보고 크로스핏 체험하러 가봤는데 진짜 재밌었다 !! 다치지 않게 조심해야지 ~~',0,0,0,NULL),
    (6,'ssafy','2023-11-09 10:01:22','06.jpg','06','같이 운동합시당!','크로스핏은 사람들이랑 같이 할 수 있어서 좋은듯,,, 다음엔 친구 데리고 가야지',0,0,0,NULL),
    (7,'ssafy','2023-11-10 10:01:22','07.jpg','07','오늘 운동 맛있다 ~','운동 열심히 합시다. 운동이 최고야. 운동하면 오래살고 건강해진다잉',0,0,0,NULL),
    (8,'ssafy','2023-11-10 09:01:22','08.jpg','08','인생사진 건졌다 ㅋㅋ','같이 운동하시는 분한테 찍어달라고 했는데 좀 괜찮은듯? 역시 운동할 때 잘생겨보이나 ㅋㅋ',0,0,0,NULL),
    (9,'ssafy','2023-11-10 22:22:22','09.jpg','09','진짜 힘든 하루 ..','오늘은 역대급 힘든날 .. ㅠ 내일 근육통이 벌써 두렵다요 ㅠ',0,0,0,NULL),
    (10,'ssafy','2023-11-11 09:01:22','10.jpg','10','오랜만에 거울샷 ㅋ','거울이 조금 더럽긴 하지만 복근 잘보여서 기록해둡니다 ~~',0,0,0,NULL),
    (11,'ssafy','2023-11-12 09:01:22','11.jpg','11','헬스장에 나홀로','내가 1빠로 도착해서 혼자 여유롭게 운동하고 왔다 .. 헬스장 조명 새로 갈았던데 좋은듯?',0,0,0,NULL),
    (12,'ssafy','2023-11-13 09:01:22','12.jpg','12','태닝하러 다녀온 날','바디프로필 준비를 위해서 태닝하고 왔다.. 근육이 더 잘 보이나? 모르겠다',0,0,0,NULL),
    (13,'ssafy','2023-11-14 09:01:22','13.jpg','13','내 등 어떤데','오늘은 등을 집중적으로 했는데 맘에 들어서 한 번 찍어봤음!',0,0,0,NULL),
    (14,'ssafy','2023-11-14 22:44:22','14.jpg','14','으으으아 !!!','오늘의 2번째 운동 .. 대회 준비 해볼까? 식단하기 너무 싫은데 ..ㅠㅠ',0,0,0,NULL),
    (15,'ssafy','2023-11-15 09:01:22','15.jpg','15','대박','오늘 오랜만에 크로스핏 갔는데 성빈이 형님이랑 같이 운동했다,, 역시 국대는 다른듯 허락 맡고 찍은 사진 기록해두기 !!',0,0,0,NULL);
-- 중략


INSERT INTO `comment` (`comment_id`,`diary_id`,`user_id`,`content`,`write_date`,`update_date`,`is_deleted`,`parent_comment`) 
VALUES 
	(1,24,'dhwlgP','역시 현수 멋져요 !!','2023-11-23 09:07:44',NULL,0,0),
    (2,95,'ssafy','역시 내 친구 최고다 💪🏻','2023-11-23 09:20:20',NULL,0,0),
    (3,95,'shtpgml','대회 준비 응원합니다 ~~~','2023-11-23 09:31:55',NULL,0,0),
    (4,24,'shtpgml','조현수 최고 ㅋㅅㅋ','2023-11-23 09:32:14',NULL,0,0),
    (5,23,'shtpgml','다음에 같이 가요 ㅋㅋㅋ 저도 등산 좋아합니당','2023-11-23 09:32:51',NULL,0,0),
    (6,64,'shtpgml','우와 부러워요 ㅠㅠ','2023-11-23 09:33:01',NULL,0,0),
    (7,95,'dltmdgjs','형 친구에요 ? 다음에 같이 운동 ㄱㄱ','2023-11-23 09:33:46',NULL,0,2),
    (8,95,'dbtmdgh','내가 더 멋진듯 ㅋ','2023-11-23 09:39:26',NULL,0,2),
    (13,95,'rlaqudgus','저도 운동 알려주세요 !!','2023-11-23 10:07:44',NULL,0,0),
    (14,95,'rlawhddls','나랑 농구나 하자','2023-11-23 10:10:01',NULL,0,13),
    (15,95,'rlawldms','오 ~ 운동하신지 얼마나 되셨어요 ?','2023-11-23 10:11:23','2023-11-23 10:11:33',0,0),
    (16,95,'tjrwlaud','헬스말고 클라이밍은 어떠세요 ㅋㅋㅋ? 끝나고 애니도 같이 봐요 🙏🏻','2023-11-23 10:13:15',NULL,0,0),
    (17,95,'rladudtjq','형 무슨 애니 보실건데요 ?','2023-11-23 10:13:48',NULL,0,16),
    (18,23,'rlatjsdud','하늘 예쁘네요 ~','2023-11-23 10:16:00',NULL,0,0),
    (20,95,'rlaskawns','닭가슴살 추천부탁드려요','2023-11-23 10:17:14',NULL,1,0),
    (21,95,'rladPFla','나도나도','2023-11-23 10:17:42',NULL,0,20);

INSERT INTO `likediary` (`user_Id`,`diary_Id`) 
VALUES 
    ('rlatjsdud',23),
    ('shtpgml',23),
    ('dltmdgjs',24),
    ('shtpgml',24),
    ('dltmdgjs',64),
    ('dltmdgjs',69),
    ('dbtmdgh',95),
    ('dltmdgjs',95),
    ('rladbrud',95),
    ('rladudtjq',95),
    ('rlaqudgus',95),
    ('rlaskawns',95),
    ('rlatjsdud',95),
    ('rlawldms',95),
    ('shtpgml',95),
    ('ssafy',95),
    ('whdydghks',95),
    ('shtpgml',134),
    ('rlatjsdud',159),
    ('wjsdmsvud',95),
    ('rlaxodns',95);

```

<br>


## 	✏️ Commit Message Rule
### [커밋 타입]: [작업내용]
Feat : 기능 (새로운 기능)

Fix : 버그 (버그 수정)

Refactor : 리팩토링

Design : css나 디자인 변경, 이미지 추가 등

Style : 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우

Comment : 필요한 주석 추가 했을 경우

Docs : 문서 (문서 추가, 수정, 삭제 ex. README.md, DailyScrum.md)

Chore : 기타 변경사항


