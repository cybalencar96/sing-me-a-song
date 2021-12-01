import express from 'express';
import { postRecommendation } from './controllers/recommendation.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.post('/recommendation', postRecommendation);

export default app;
