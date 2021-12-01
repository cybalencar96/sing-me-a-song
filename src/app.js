import express from 'express';
import { postRecommendation, vote } from './controllers/recommendationController.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.post('/recommendation', postRecommendation);
app.post('/recommendation/:id/upvote', vote('up'));
app.post('/recommendation/:id/downvote', vote('down'));

export default app;
