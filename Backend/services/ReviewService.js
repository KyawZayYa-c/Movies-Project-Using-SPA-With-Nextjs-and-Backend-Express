const Review = require('../models/Reviews');
const Movie = require('../models/Movies');
const mongoose = require('mongoose');
async function getAllReviewsByMovieId(movieId) {
    let reviews = await Review.find({ movie: movieId });
    return reviews;
}

async function saveReview(review) {
    let movie = await Movie.findById(review.movie);
    if(!movie) {
        throw new Error('"Could not find movie with id "' + review.movie + '"');
    }
    review.movie = new mongoose.Types.ObjectId(review.movie);
    const newReview = new Review(review);
    return await newReview.save();
}

async function updateReview(id, review) {
    let existingReview = await Review.findById(id);
    if(!existingReview) {
        throw new Error('"Could not find review with id "' + review.movie + '"');
    }else {
        const exstingMovie = await Movie.findById(review.movie);
        if(!exstingMovie) {
            throw new Error('"Could not find movie with id "' + review.movie + '"');
        }
        review.movie =new mongoose.Types.ObjectId(review.movie);
        let update = await Review.findByIdAndUpdate(id, review, {new: true});
        return update;
    }
}

async function deleteReview(id){
    const  existingReview = await Review.findById(id);
    if(!existingReview) {
        throw new Error('"Could not find review with id "' + id + '"');
    }
    let review = await Review.findByIdAndDelete(id);
    return review;
}

module.exports = {
    getAllReviewsByMovieId,
    saveReview,
    updateReview,
    deleteReview,
}