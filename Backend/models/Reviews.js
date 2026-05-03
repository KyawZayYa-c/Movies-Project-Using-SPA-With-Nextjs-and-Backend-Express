const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movie : {
        type: Schema.Types.ObjectId,
        ref: 'Movies',
        required : true,
    },
    rating : {
        type : Number,
        required : true,
    },
    review : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('Reviews', reviewSchema);