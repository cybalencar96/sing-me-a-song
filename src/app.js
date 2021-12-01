import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.send(200);
});

export default app;
