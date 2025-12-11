import reviewModel from '../models/review-model.js';
import invModel from '../models/inventory-model.js';

export async function buildAddReview(req, res) {
    const inv_id = parseInt(req.params.inv_id);
    const vehicle = await invModel.getInventoryById(inv_id);
    res.render('reviews/add-review', {
        title: `Add Review for ${vehicle.inv_make} ${vehicle.inv_model}`,
        inv_id,
        errors: null
    });
}

export async function addReview(req, res) {
    const { inv_id, review_title, review_text, review_rating } = req.body;
    try {
        await reviewModel.addReview(inv_id, review_title, review_text, review_rating);
        req.flash('notice', 'Review added successfully.');
        res.redirect(`/inventory/detail/${inv_id}`);
    } catch (error) {
        req.flash('notice', 'Sorry, the review could not be added.');
        res.redirect(`/review/add/${inv_id}`);
    }
}