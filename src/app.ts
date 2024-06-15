/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import router from './app/route';
import globalErrorHandeler from './app/middleware/globalErrorHandeler';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost/6000'] }));

//application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.use(globalErrorHandeler);
app.use(notFound);

export default app;
