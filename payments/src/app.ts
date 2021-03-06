import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tayfurerkenci/common';
import { createChargeRouter } from './routes/new';

export const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
})

// if callback mark as async, we must use next function
// or use express-async-errors npm package
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// })

app.use(errorHandler);

export default app;
