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
	from_client BOOLEAN NOT NULL,
	message TEXT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (client) REFERENCES client_name (id)
);

DESC client_name;
DESC chat;

INSERT INTO client_name (name, device_id) VALUES
('Alice', 'a0ee5495-eea9-47e0-bc57-e64ea6340763');

INSERT INTO chat (client, message, from_client, time) VALUES
(1, 'Hi! I’d like to discuss the new analytics feature.', true,  '2025-05-10 09:15:00'),
(1, 'Do you think it’s possible to add real-time tracking?', false, '2025-05-10 09:16:23'),
(1, 'We want to see active users and click events live.', true, '2025-05-10 09:17:45'),
(1, 'Also, will this impact loading time?', true, '2025-05-10 09:18:30'),
(1, 'Great! How long do you think it’ll take?', false, '2025-05-10 09:19:10'),
(1, 'Perfect. Just let me know if you need anything else.', true, '2025-05-10 09:21:00'),
(1, 'Awesome, thanks for the update!', false, '2025-05-10 10:22:17'),
(1, 'Any updates so far?', true, '2025-05-10 09:35:22'),
(1, 'No worries, just checking in.', false, '2025-05-10 10:01:48'),
(1, 'Looking forward to seeing it in action.', false, '2025-05-10 10:55:03');

SELECT * FROM client_name;
SELECT * FROM chat;
