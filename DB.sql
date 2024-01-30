
CREATE TABLE file
(
  pk           INT          NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  t_name       VARCHAR(255) NULL     COMMENT '사용테이블',
  t_pk         INT          NULL     COMMENT '사용컬럼pk',
  path         VARCHAR(255) NOT NULL COMMENT '파일주소',
  ext          VARCHAR(255) NOT NULL COMMENT '확장자',
  size         INT          NOT NULL COMMENT '사이즈(kb)',
  is_thumb     char(1)      NULL     DEFAULT 0 COMMENT '썸네일여부(0, 1)',
  comment      TEXT         NULL     COMMENT '코멘트',
  updated_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '수정일',
  created_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (pk)
) COMMENT '파일 관리';

CREATE TABLE post
(
  pk           INT          NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  title        VARCHAR(255) NULL     COMMENT '카테고리명',
  content      TEXT         NULL     COMMENT '내용(HTML)',
  is_public                 NULL     COMMENT '공개여부',
  is_review                 NULL     COMMENT '답글여부',
  comment      TEXT         NULL     COMMENT '코멘트',
  updated_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '수정일',
  created_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (pk)
) COMMENT '블로그 게시글';

CREATE TABLE review
(
  pk           INT          NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  nickname     VARCHAR(255) NOT NULL COMMENT '닉네임',
  content      TEXT         NOT NULL COMMENT '내용',
  pw                        NULL     COMMENT '비밀번호',
  is_public                 NULL     COMMENT '공개여부',
  comment      TEXT         NULL     COMMENT '코멘트',
  updated_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '수정일',
  created_date DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (pk)
) COMMENT '댓글';

ALTER TABLE review
  ADD CONSTRAINT UQ_nickname UNIQUE (nickname);

CREATE UNIQUE INDEX member_index
  ON post (pk ASC);
