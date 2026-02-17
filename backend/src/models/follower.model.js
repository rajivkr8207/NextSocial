const mongoose = require('mongoose')

const FollowerScheme = new mongoose.Schema({
    follower: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"],
    },
    followee: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"],
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accept', 'reject']
    }
}, { timestamps: true })

FollowerScheme.index({ follower: 1, followee: 1 }, { unique: true })

const FollowerModel = mongoose.model('follower', FollowerScheme)

module.exports = FollowerModel