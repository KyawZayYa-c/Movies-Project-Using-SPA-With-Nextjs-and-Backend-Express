const ReviewService = require('../services/ReviewService');

async function getAllReviewsByMovieId(req, res, next ) {
    let movie = req.params.movieId;
    try{
        let reviews = await ReviewService.getAllReviewsByMovieId(movie);
        res.json(reviews);
    }catch(err){
        res.status(404).send({error: err.message});
    }

}

async function saveReview(req, res, next ) {
    let review = req.body;
    try{
        let saveReview = await ReviewService.saveReview(review);
        res.status(201).json(saveReview);
    }catch(err){
        res.status(404).send({error: err.message});
    }

}

async function updateReview(req, res, next ) {
    let review = req.body;
    let id = req.params.id;
    try{
        let saveReview = await ReviewService.updateReview(id,review);
        res.status(201).json(saveReview);
    }catch(err){
        res.status(404).send({error: err.message});
    }

}

async function deleteReview(req, res, next ) {
    let id = req.params.id;
    try{
        const deleteRev = await ReviewService.deleteReview(id);
        res.status(200).json(deleteRev);
    }catch(err){
        res.status(404).send({error: err.message});
    }

}

module.exports = {
    getAllReviewsByMovieId,
    saveReview,
    updateReview,
    deleteReview
}