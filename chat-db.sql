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
