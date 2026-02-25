const mongoose = require('mongoose')

const ChatScheme = new mongoose.Schema({
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

const Chatmodel = mongoose.model('Chat', ChatScheme)
module.exports = Chatmodel