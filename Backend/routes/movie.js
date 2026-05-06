const express = require('express');
const {getAllMovies, saveMovie,  getById, updateMovie, deleteMovie} = require("../controllers/MovieController");

const router = express.Router();

router.get('/',getAllMovies)
router.get('/:id',getById)
router.post('/',saveMovie);
router.delete('/:id',deleteMovie)
router.put('/:id',updateMovie);

module.exports = router;