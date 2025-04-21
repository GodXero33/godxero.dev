import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
