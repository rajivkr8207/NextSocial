const mongoose = require('mongoose')

const BookmarkScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post id is required"]
    }

}, { timestamps: true })

const Bookmarkmodel = mongoose.model('BookMark', BookmarkScheme)
module.exports = Bookmarkmodel