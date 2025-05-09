import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

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

app.use('/site', express.static(path.join(__dirname, '../public')));
app.use('/admin', (req: Request, res: Response, next: NextFunction) => {
	const allowedIps = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];

	if (allowedIps.includes(req.ip)) {
		next();
	} else {
		res.status(403).send('Forbidden: Admin access allowed only from localhost');
	}
}, express.static(path.join(__dirname, '../admin')));

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
