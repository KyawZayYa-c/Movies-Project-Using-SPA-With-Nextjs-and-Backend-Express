const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director : {
        type : {
            name : {
                type : String,
                required : true,
            },
            phoneNo : {
                type : String,
            }
        },
        required : false,
    },
    year : {
        type : Number,
        required : false,
    }
})

module.exports = mongoose.model('Movies', MovieSchema);