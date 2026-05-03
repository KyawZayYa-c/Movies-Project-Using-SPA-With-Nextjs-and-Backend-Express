const MovieService = require("../services/MovieService");

const getAllMovies = async (req, res) => {
    try{
        let movies = await MovieService.getAllMovies();
        res.status(200).json(movies);
    }catch (error){
        res.status(400).json(error.message);
    }
}

const getById = async (req, res) => {
    const id = req.params.id;
    try{
        let movies = await MovieService.getById(id);
        res.status(200).json(movies);
    }catch (error){
        res.status(400).json(error.message);
    }
}

const saveMovie = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    try{
        let movies = await MovieService.saveMovie(data);
        console.log('response', movies);
        res.status(201).json(movies);
    }catch (error){
        res.status(400).json(error.message);
    }
}
const updateMovie = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try{
        let movies = await MovieService.updateMovie(id, body);
        res.status(201).json(movies);
    }catch (error){
        res.status(400).json(error.message);
    }
}

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    try{
        let movies = await MovieService.deleteMovie(id);
        res.status(201).json(movies);
    }catch (error){
        res.status(400).json(error.message);
    }
}

module.exports = {
    getAllMovies,
    saveMovie,
    getById,
    updateMovie,
    deleteMovie,
}