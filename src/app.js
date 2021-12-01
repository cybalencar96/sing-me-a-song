import express from 'express';
import { postRecommendation, upVote } from './controllers/recommendationController.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.post('/recommendation', postRecommendation);
app.post('/recommendation/:id/upvote', upVote);

export default app;
