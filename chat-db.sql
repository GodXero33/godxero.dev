DROP DATABASE IF EXISTS god_xero_dev_chat_db;
CREATE DATABASE god_xero_dev_chat_db;
USE god_xero_dev_chat_db;

CREATE TABLE client_name (
	id BIGINT AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	device_id VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE chat (
	client BIGINT,
	message TEXT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (client) REFERENCES client_name (id)
);

DESC client_name;
DESC chat;

INSERT INTO client_name (name, device_id) VALUES
('Alice', '2001:0db8:85a3:0000:0000:8a2e:0370:7334'),
('Bob', '2001:0db8:85a3:0000:0000:8a2e:0370:7335'),
('Charlie', '2001:0db8:85a3:0000:0000:8a2e:0370:7336'),
('Diana', '2001:0db8:85a3:0000:0000:8a2e:0370:7337'),
('Ethan', '2001:0db8:85a3:0000:0000:8a2e:0370:7338'),
('Fiona', '2001:0db8:85a3:0000:0000:8a2e:0370:7339'),
('George', '2001:0db8:85a3:0000:0000:8a2e:0370:7340'),
('Hannah', '2001:0db8:85a3:0000:0000:8a2e:0370:7341'),
('Ivan', '2001:0db8:85a3:0000:0000:8a2e:0370:7342'),
('Julia', '2001:0db8:85a3:0000:0000:8a2e:0370:7343');

INSERT INTO chat (client, message) VALUES
(NULL, 'Hello Alice!'),
(NULL, 'How are you Bob?'),
(NULL, 'Hey Charlie, long time no see!'),
(NULL, 'Diana, please update your profile.'),
(NULL, 'Ethan, are you available for a meeting?'),
(NULL, 'Fiona, let’s work on the new feature.'),
(NULL, 'George, can you finish the task by tomorrow?'),
(NULL, 'Hannah, check your inbox.'),
(NULL, 'Ivan, don’t forget our meeting at 2 PM.'),
(NULL, 'Julia, I’ll send the report shortly.'),
(1, 'Hi, I’m doing well!'),
(2, 'Great, thanks for asking!'),
(3, 'I’ve been good! Just busy with work.'),
(4, 'Sure! I’ll get to that soon.'),
(5, 'I’m free this afternoon, what time works for you?'),
(6, 'I’ve already started on the new feature, stay tuned!'),
(7, 'I’ll have the task done by tomorrow morning.'),
(8, 'I just replied to your email, please check.'),
(9, 'I’m ready for the meeting.'),
(10, 'Got it, I’ll look for your report.'),
(1, 'Can you send me the update for the meeting?'),
(2, 'I’m available for a call, just let me know.'),
(3, 'The deadline is approaching, do you need any help?'),
(4, 'I’ve started working on it, should be ready soon.'),
(5, 'Could you extend the deadline by a day?'),
(6, 'I’ve reviewed the updates and I’ll follow up.'),
(7, 'Got your message, I’ll prepare for our call.'),
(8, 'I’ve received the document, thanks for sending.'),
(9, 'I’m not sure about the schedule, please confirm.'),
(10, 'I’ll check my inbox and get back to you.'),
(1, 'Any update on the progress?'),
(2, 'Let’s talk soon, I have some ideas.'),
(3, 'I’m working on it, I’ll keep you posted.'),
(4, 'Everything is on track, thanks for the follow-up!'),
(5, 'I’ll need a bit more time, but I’m on it.'),
(6, 'I’ll give you a status update in a few hours.'),
(7, 'I’m handling the task now, no worries!'),
(8, 'I’ll send the details soon.'),
(9, 'Looking forward to meeting you later.'),
(10, 'I’ll get back to you once I’ve gone through the file.'),
(1, 'Reminder: Let’s meet tomorrow morning.'),
(2, 'Don’t forget the new meeting time tomorrow.'),
(3, 'I just finished my task, ready to share.'),
(4, 'Got your message, I’ll be there.'),
(5, 'I’ll confirm with you later about the schedule.'),
(6, 'Here’s the report, let me know if anything is missing.'),
(7, 'I’ve finished the task ahead of schedule.'),
(8, 'Let me know if you need anything else from me.'),
(9, 'I’ve updated the document as requested.'),
(10, 'I’ll finalize it tomorrow and send it over.'),
(NULL, 'New update on the project.'),
(NULL, 'Check the new task I assigned to you.'),
(NULL, 'Please make sure to submit the report by end of the day.'),
(NULL, 'Reminder: We have a meeting at 3 PM tomorrow.'),
(NULL, 'Keep up the good work, everyone!'),
(NULL, 'Thanks for the update, I’ll review it shortly.'),
(NULL, 'Don’t forget about the deadline for next week.'),
(NULL, 'Please confirm if you’re attending tomorrow’s meeting.'),
(NULL, 'Great progress so far, keep it up!'),
(NULL, 'Let’s catch up in the afternoon to review the work.');

SELECT * FROM client_name;
SELECT * FROM chat;
