import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/', recommendationController.post);
router.post('/:id/upvote', recommendationController.vote('up'));
router.post('/:id/downvote', recommendationController.vote('down'));
router.get('/random', recommendationController.getRandom)

export default router;