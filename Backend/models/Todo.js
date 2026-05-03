const mongoose = require('mongoose');
const {Schema} = mongoose;

const TodoSchema = new Schema({
    title : {type : String, required: true},
    completed : Boolean,
});

const Todos = mongoose.model('Todos', TodoSchema);
module.exports = Todos
