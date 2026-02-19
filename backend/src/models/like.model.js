const mongoose = require('mongoose')

const LikeScheme = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: [true, "Post id is required"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"],
    }
}, { timestamps: true })

LikeScheme.index({ post: 1, user: 1 }, { unique: true });


const LikeModel = mongoose.model('dike', LikeScheme)

module.exports = LikeModel