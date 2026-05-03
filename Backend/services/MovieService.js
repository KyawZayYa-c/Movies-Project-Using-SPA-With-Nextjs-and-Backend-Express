const Movie = require("../models/Movies");

async function getAllMovies(){
    let movies = await Movie.find({});
    return movies;
}

async function getById(movies) {
    let movie = await Movie.findById(movies);
    return movie;
}


async function saveMovie(movie){
    let newMovie = new Movie(movie);
    let savmovie = await newMovie.save();
    return savmovie;
}
async function updateMovie(id,movie){
    let data = await Movie.findByIdAndUpdate(id,movie, { new: true});
    return data;
}

async function deleteMovie(id){
    const data = await Movie.findByIdAndDelete(id);
    return data;
}
module.exports = {
    getAllMovies,
    getById,
    saveMovie,
    updateMovie,
    deleteMovie,

}