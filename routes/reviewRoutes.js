import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import reviewValidate from '../utilities/review-validation.js';

const router = express.Router();

router.get('/add/:inv_id', reviewController.buildAddReview);
router.post(
    '/add',
    reviewValidate.reviewRules(),
    reviewValidate.checkReviewData,
    reviewController.addReview
);

export default router;