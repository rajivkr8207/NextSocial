const mongoose = require('mongoose')

const RatingScheme = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "rating is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    ishidden: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
}, { timestamps: true })

const Ratingmodel = mongoose.model('Rating', RatingScheme)
module.exports = Ratingmodel