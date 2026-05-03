const express = require('express') ;

const {getAllTodo, getById, saveTodo, updateTodo, deleTodo} = require("../controllers/TodoController");
const router = express.Router();

router.get('/', getAllTodo);

router.get('/:id', getById );

router.post('/', saveTodo)

router.put('/:id', updateTodo)
router.delete('/:id', deleTodo)

module.exports = router;