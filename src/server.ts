import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import http, { IncomingMessage } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { parse } from 'url';

dotenv.config();

class DBError extends Error {
	constructor (message: string) {
		super(message);

		this.name = 'DBError';
	}
}

const dbConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

dbConnection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err.message);
		process.exit(1);
	} else {
		console.log('Connected to the database');
	}
});

const app = express();
const port = process.env.PORT || 5500;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use('/site', express.static(path.join(__dirname, '../public')));
app.use('/admin', (req: Request, res: Response, next: NextFunction) => {
	const allowedIps = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];

	if (allowedIps.includes(req.ip)) {
		next();
	} else {
		res.status(403).send('Forbidden: Admin access allowed only from localhost');
	}
}, express.static(path.join(__dirname, '../admin')));

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
	const query = parse(req.url || '', true).query;
	const deviceId = query.uuid as string;

	console.log(`Client connected: ${deviceId}`);

	loadChatForDevice(deviceId).then(chatData => {
		if (chatData) {
			ws.send(JSON.stringify({
				type: 'load-chat',
				chat: chatData
			}));
		} else {
			ws.send(JSON.stringify({
				type: 'new-chat'
			}));
		}
	}).catch(error => console.error(error));

	ws.on('message', (message) => {
		const msg = JSON.parse(message.toString());
		console.log('Received:', msg);

		if (msg.type === 'new-chat') {
			addNewClient(msg.name, deviceId).then(() => {
				ws.send(JSON.stringify({
					type: 'start-chat'
				}));
			}).catch((error) => console.error(error));
		}
	});

	ws.on('close', () => console.log(`Client disconnected: ${deviceId}`));
});

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

function getClientFromDeviceID (deviceId: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const queryClient = 'SELECT id, name FROM client_name WHERE device_id = ?';

		dbConnection.query(queryClient, [deviceId], (err, clientRows) => {
			if (err) {
				reject(err.message);
				return;
			}

			if ((clientRows as any[]).length === 0) {
				// No client found for device ID
				resolve(null);
				return;
			}

			// Found client
			resolve(clientRows[0]);
		});
	});
}

function getChatForClient (clientID: number): Promise<any> {
	return new Promise((resolve, reject) => {
		const chat = [];
		const queryChat = 'SELECT from_client, message, time FROM chat WHERE client = ?';

		dbConnection.query(queryChat, [clientID], (err, chatRows) => {
			if (err) {
				reject(err.message);
				return;
			}

			(chatRows as any[]).forEach((msg: any) => {
				chat.push({
					message: msg.message,
					time: msg.time,
					fromClient: msg.from_client
				});
			});

			resolve(chat);
		});
	});
}

function loadChatForDevice (deviceId: string): Promise<any> {
	return new Promise(async (resolve, reject) => {
		let client = null;

		try {
			client = await getClientFromDeviceID(deviceId);
		} catch (error) {
			reject(error);
			return;
		}

		if (client == null) {
			resolve(null);
			return;
		}

		let chat = null;

		try {
			chat = await getChatForClient(client.id);
		} catch (error) {
			reject(error);
			return;
		}

		resolve({
			client: client.name,
			chat
		});
	});
}

function addNewClient (name: string, deviceId: string) {
	return new Promise((resolve, reject) => {
		const queryInsertClient = 'INSERT INTO client_name (name, device_id) VALUES (?, ?)';

		dbConnection.query(queryInsertClient, [name, deviceId], (insertErr, result) => {
			if (insertErr) {
				reject(new DBError('Error inserting new client: ' + insertErr.message));
				return;
			}

			const insertId = (result as mysql.ResultSetHeader).insertId;

			console.log(`New client added with ID: ${insertId}`);
			resolve(null);
		});
	});
}
