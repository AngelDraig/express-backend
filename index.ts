import express, { Express, Request, Response } from 'express';
const cors = require('cors')
import dotenv from 'dotenv';

import userRouter from './src/api/user/UserRouter';
import loginRouter from './src/api/login/LoginRouter';
import Middlewires from './src/tools/middlewires';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  	res.send('Server');
});

app.use(userRouter);
app.use(loginRouter);

app.use(Middlewires.customErrorHandler);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});