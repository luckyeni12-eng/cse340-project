import { body, validationResult } from 'express-validator';

const reviewRules = () => [
    body('review_title').trim().isLength({ min: 3 }).withMessage('Title required.'),
    body('review_text').trim().isLength({ min: 10 }).withMessage('Review text required.'),
    body('review_rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1–5.')
];

const checkReviewData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const { inv_id } = req.body;
        return res.render('reviews/add-review', {
            title: 'Add Review',
            errors: errors.array(),
            inv_id,
            ...req.body
        });
    }
    next();
};

export default { reviewRules, checkReviewData };
