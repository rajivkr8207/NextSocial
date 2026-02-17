const mongoose = require('mongoose') 

const FollowerScheme = new mongoose.Schema({
    follower:{  
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"],
    },
    followee:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "User id is required"],
    }
}, {timestamps: true})

const Follower = mongoose.model('follower', FollowerScheme)

module.exports = Follower