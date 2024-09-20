# CRM Service Project 

* My Travel Planner

<p align="center">
  <img src="./images/mainpage.png">
</p>

<P align="justify">
  배포 URL: https://myplanner.guswldaiccproject.com

  
  Test_ID : Test@gmail.com


  TEST_PW : 12345


</p>

# 1. 프로젝트 소개 & 목적


### 프로젝트 소개
  
  *  AI를 통해 여행 계획을 작성하는 웹은 있습니다.
  
  
  *  사용자가 달력으로 여행 날짜, 장소, 정보 작성 하는 웹은 없습니다.
  

  * 여행 계획 뿐만 아니라 사용자가 방문했던 장소를 사진을 등록하고 여행 정보를 작성 할 수 있는 시스템


### 프로젝트 목적

  * 구글 지도 제공하여 로드맵 확인 가능


  * 일정 계획을 통해 캘린더에서 날짜를 선택하여 목록 생성


  * 여행 장소를 시 우측에 내가 적었던 여행 정보 표현, 수정 및 삭제 가능


# 2. 개발 환경

* 기술 스택

```
📦 Front - React App
├── 📂 .github
│   └── 📂 workflows
│       └── cicd.yml (CI/CD 파이프라인 설정 파일)
│
├── 📂 build
│   └── (빌드된 파일들)
│
├── 📂 node_modules
│   └── (의존성 모듈들)
│
├── 📂 public
│   └── (정적 파일들)
│
├── 📂 src
│   ├── 📂 Component
│   │   ├── 📂 Auth
│   │   │   └── (인증 관련 컴포넌트)
│   │   ├── 📂 Home
│   │   │   └── (홈 페이지 컴포넌트)
│   │   ├── 📂 Calendarpage
│   │   │   └── (캘린더 페이지 컴포넌트)
│   │   ├── 📂 Map
│   │   │   └── (지도 관련 컴포넌트)
│   │   ├── 📂 Planner
│   │   │   └── (플래너 관련 컴포넌트)
│   ├── Apps.js
│   └── Index.css
│
├── dockerfile
│   └── (Docker 설정 파일)
│
├── nginx.conf
│   └── (Nginx 설정 파일)
│
├── package.json
│   └── (의존성 및 프로젝트 정보)
│
└── README.md

```

# 3. 구현 기능

<p align="center">
  <img src="./images/MapApi.png">
</p>

* 여행 계획 시 참고할 Google 지도 구현


<p align="center">
  <img src="./images/MapRoad.png">
</p>

* Google 지도 로드맵 기능 지원
