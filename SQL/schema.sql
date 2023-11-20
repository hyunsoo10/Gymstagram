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
  `user_name` CHAR(5) CHARACTER SET utf8mb4 NOT NULL,
  `nickname` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
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
  `create_date` DATE NOT NULL DEFAULT (current_date),
  `save_image` VARCHAR(150),
  `original_image` VARCHAR(50),
  `title` VARCHAR(45) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `content` LONGTEXT CHARACTER SET utf8mb4 NOT NULL,
  `view_count` int(52) DEFAULT 0,
  `like_count` int(52) DEFAULT 0,
  `range` int(2) DEFAULT 0,
  `update_date` DATE,
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
  `avty_name` VARCHAR(45) CHARACTER SET utf8mb4 NOT NULL,
   PRIMARY KEY (`avty_code`)
);


CREATE TABLE IF NOT EXISTS `likeDiary`(
  `user_Id` VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL,
  `diary_Id` INT NOT NULL,
  PRIMARY KEY (`user_Id`, `diary_Id`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`diary_Id`) REFERENCES `diary` (`diary_Id`) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS `viewDiary`(
--   `userId` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
--   `diaryId` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
--   PRIMARY KEY (`userId`, `diaryId`),
--   CONSTRAINT `like_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
--   CONSTRAINT `like_ibfk_2` FOREIGN KEY (`diaryId`) REFERENCES `diary` (`diaryId`) ON DELETE CASCADE
-- );

-- follow 테이블 만들면 이런식으로
-- CREATE TABLE IF NOT EXISTS `follow`(
--   `followerId` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
--   `followingId` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
--    PRIMARY KEY (`followerId`, `followingId`),
--   FOREIGN KEY (`followerId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
--   FOREIGN KEY (`followingId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
-- );


