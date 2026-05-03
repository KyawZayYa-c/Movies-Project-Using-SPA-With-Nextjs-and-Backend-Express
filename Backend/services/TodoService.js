const Todo = require('../models/Todo');

const getAllTodos = async () => {
       const todos =await Todo.find();
        return todos;
}

const getById = async (id) => {
    let todos = await Todo.findById(id);
    return todos;
}

const saveTodo = async (todo) => {
    let newTodo = new Todo(todo);
    newTodo = await newTodo.save();
    return newTodo;
}

async function updateTodo(id,todo)
{
    let updatedTodo = await Todo.findByIdAndUpdate(id,todo,{
        new: true
    });
    return updatedTodo;
}

const deleteTodo = async (id) => {
    let todelete = await Todo.findByIdAndDelete(id);
    return todelete;

}
module.exports = {
    getAllTodos,
    getById,
    saveTodo,
    updateTodo,
    deleteTodo
}