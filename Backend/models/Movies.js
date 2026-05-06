const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Reviews');

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

MovieSchema.pre('findOneAndDelete', async function() {
    // အခု ဖျက်မယ့် movie ကို ရှာတယ်
    const docToDelete = await this.model.findOne(this.getQuery());

    if (docToDelete) {
        // အဲ့ဒီ movie နဲ့ ဆိုင်တဲ့ review တွေကို ဖျက်တယ်
        await Review.deleteMany({ movie: docToDelete._id });
        console.log(`Cascade Delete: Reviews for movie "${docToDelete.title}" removed.`);
    }
});

module.exports = mongoose.model('Movies', MovieSchema);