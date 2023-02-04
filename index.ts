import express, { Express, Request, Response } from 'express';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

import userRouter from './src/api/user/UserRouter';
import loginRouter from './src/api/login/LoginRouter';
import Middlewires from './src/tools/middlewires';

import { REQUEST_SECOND_LIMIT } from './src/config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const limiter = rateLimit({
	windowMs: 1000,
	max: REQUEST_SECOND_LIMIT,
	message: "limit of request, please wait",
	keyGenerator: (request, response) => request.ip,
});



app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

app.use(Middlewires.logEvents);
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  	res.send('Server');
});

app.use(userRouter);
app.use(loginRouter);

app.use(Middlewires.customErrorHandler);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});