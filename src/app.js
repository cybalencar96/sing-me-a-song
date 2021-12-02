import express from 'express';
import serverErrorMiddleWare from './middlewares/serverError.js';
import recommendationRouter from './routers/recommendationRouter.js';

const app = express();

app.use(express.json());

app.use('/recommendations', recommendationRouter);

app.use(serverErrorMiddleWare);

export default app;
