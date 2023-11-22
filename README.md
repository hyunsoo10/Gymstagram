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

## 📌 클래스 다이어그램

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

### data.sql

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


