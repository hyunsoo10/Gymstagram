SELECT * FROM ssafy_final.diary;

SELECT * FROM ssafy_final.diary
	WHERE diary.create_date BETWEEN ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) AND ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 )
    AND diary.user_id='ssafy'
    GROUP BY diary.create_date
    ORDER BY diary.create_date;
    
SELECT max(diary_id) FROM ssafy_final.diary
	WHERE diary.create_date BETWEEN ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) AND ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 )
    AND diary.user_id='ssafy'
    GROUP BY diary.create_date
    ORDER BY diary.create_date;

SELECT ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 0 ) AS MONDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 1 ) AS TUESDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 2 ) AS WEDNESDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 3 ) AS THURSDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 4 ) AS FRIDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 5 ) AS SATURDAY,
          ADDDATE( CURDATE(), - WEEKDAY(CURDATE()) + 6 ) AS SUNDAY;
          
          SELECT *
			FROM comment
			WHERE diary_id = 95;
            
SELECT c.comment_id, c.diary_id, c.user_id, u.nickname, c.write_date, c.update_date, c.is_deleted, c.parent_comment
FROM comment c
LEFT JOIN user u ON c.user_id = u.user_id
WHERE diary_id = 95;