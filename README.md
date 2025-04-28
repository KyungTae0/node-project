# NODE Project

익명 게시판 + 키워드 알림 기능

## 기술 스택

- Node.js 22 (ES2024)
- NestJS 11
- TypeORM
- MySQL 8
- Docker, docker-compose
- DDD (Domain-Driven Design)

## 프로젝트 구성

- Post: 게시글 작성, 조회, 수정, 삭제
- Comment: 댓글 작성, 조회 (대댓글 지원)
- Keyword Alert: 키워드 알림 등록 및 알림 트리거

## 설치 및 실행 방법

### MySQL 서버 띄우기 (Docker)

1. 도커 로그인

- docker login

2. 도커에 mysql 서버 세팅

- docker-compose up -d
  - MySQL 서버가 localhost:3306에 실행됩니다.
  - 초기 설정
    - 데이터베이스명: board
    - 사용자명: board_user
    - 비밀번호: board_password

3. 초기 데이터 세팅 (seeding)

- npm run seed
  - 게시글, 댓글, 키워드 알람 테이블의 초기 데이터 세팅

### .env 파일 설정

1. .env 파일 생성

cp .env.dev .env

2. .env 파일 내용

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=board_user
DATABASE_PASSWORD=board_password
DATABASE_NAME=board
NODE_ENV=development

### 패키지 설치

npm install

### 데이터베이스 마이그레이션 적용 (DB 스키마 생성 스크립트)

- npm run migration:generate
  - typeorm migration 환경 세팅
  - `src/databse/migrations` 폴더에 migration query 파일 생성
- npm run migration:run
  - `src/databse/migrations`에 있는 질의문 전체 실행
    -> local DB에 table schema 생성

### NestJS 서버 실행

| npm run start:dev

- 서버는 http://localhost:7070 에서 접근할 수 있습니다.
- 코드 수정 시 핫리로드(Hot Reload) 지원합니다.

| 주요 스크립트

- npm run start:dev : 개발 서버 실행
- npm run migration:generate: 새로운 마이그레이션 생성
- npm run migration:run : 마이그레이션 적용
- npm run migration:revert : 마지막 마이그레이션 롤백
