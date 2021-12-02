import express from 'express';
import * as recommendationController from './controllers/recommendationController.js';
import serverErrorMiddleWare from './middlewares/serverError.js';
const app = express();

app.use(express.json());

app.post('/recommendations', recommendationController.post);
app.post('/recommendations/:id/upvote', recommendationController.vote('up'));
app.post('/recommendations/:id/downvote', recommendationController.vote('down'));
app.get('/recommendations/random', recommendationController.getRandom)

app.use(serverErrorMiddleWare);

export default app;
