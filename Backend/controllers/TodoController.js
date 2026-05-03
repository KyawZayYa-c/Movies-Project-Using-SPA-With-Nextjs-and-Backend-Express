const TodoService = require("../services/TodoService");
async function delay(ms){
    await new Promise(resolve => setTimeout(resolve, ms));
}
const getAllTodo = async (req, res) => {
    console.log("getAllTodo");
    try{
        let todos =await TodoService.getAllTodos();
        console.log(todos);
        res.status(200).json(todos);
    }catch (err){
        console.log('Err ' ,err);
        res.status(400).json({
            message : 'Error ' + err.message
        })
    }

}

const getById = async(req, res) => {
        let id = req.params.id;
        try{
            let todos = await TodoService.getById(id);

            res.status(200).json(todos);
        }catch (err){
            console.log('Err ' ,err);
            res.status(400).json({
                message : 'Error ' + err.message
            })
        }

    }

const saveTodo = async (req, res) => {
        let todo = req.body;
        //await delay(3000);
        try{
            newTodo = await TodoService.saveTodo(todo);
            res.status(201).json(newTodo);
        }catch (err){
            console.log('Err ' ,err);
            res.status(400).json({
                message : 'Error ' + err.message
            })
        }

}

async function updateTodo(req, res) {
    let id = req.params.id;
    let todo = req.body;
    //await delay(3000);
    try
    {
        let updatedTodo =await TodoService.updateTodo(id,todo);
        res.json(updatedTodo);
    }
    catch(err)
    {
        res.status(500).json({
            message: 'Error '+err.message,
        })
    }

}

const deleTodo = async (req, res) => {
    let id = req.params.id;
    try{
        await TodoService.deleteTodo(id);
        res.status(200).json('Delete successfully');
    }catch (err){
        console.log('Err ' ,err);
        res.status(400).json({
            message : 'Error ' + err.message
        })
    }

}

module.exports = {
    getAllTodo,
    getById,
    saveTodo,
    updateTodo,
    deleTodo,
}