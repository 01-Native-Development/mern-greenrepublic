import express from 'express';
import {postReview, getAllReviews, getUserReviews} from '../controllers/reviewControllers.js';

const router = express.Router();

router.post('/post-review', postReview);
router.get('/all-reviews', getAllReviews);
router.get('/:userId', getUserReviews);

export default router;