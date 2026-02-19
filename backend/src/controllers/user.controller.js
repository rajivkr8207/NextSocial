const FollowerModel = require("../models/follower.model")
const Postmodel = require("../models/post.model")
const Usermodel = require("../models/user.model")

const FollowerController = async (req, res) => {
    const follower = req.user.id
    const followeee = req.params.id

    const userexist = await Usermodel.findOne({ _id: followeee })
    if (!userexist) {
        return res.status(409).json({
            message: 'user is not exist'
        })
    }

    const alreadyfollower = await FollowerModel.findOne({
        follower: follower,
        followee: followeee,
    })
    if (alreadyfollower) {
        return res.status(200).json({
            message: 'you are already following '
        })
    }

    const followerr = await FollowerModel.create({
        follower: follower,
        followee: followeee,
    })
    return res.status(201).json({
        message: `${follower} id following ${followeee}`,
        followerr
    })
}

const UnFollowerController = async (req, res) => {
    const follower = req.user.id
    const followeee = req.params.id
    const userexist = await Usermodel.findOne({ _id: followeee })
    if (!userexist) {
        return res.status(409).json({
            message: 'user is not exist'
        })
    }

    const alreadyfollower = await FollowerModel.findOne({
        follower: follower,
        followee: followeee,
    })
    if (!alreadyfollower) {
        return res.status(409).json({
            message: 'you are not following'
        })
    }
    await FollowerModel.findByIdAndDelete({ _id: alreadyfollower._id })

    return res.status(201).json({
        message: 'you are unfollow'
    })
}

const FetchAllUserController = async (req, res) => {
    const myid = req.user.id
    const allUser = await Usermodel.find({
        _id:{ $ne: myid}
    })
    return res.status(200).json({
        message: "user is fetch succfully",
        allUser
    })
}

const FetchUserByIdController = async (req, res) => {
    const id = req.params.id
    const User = await Usermodel.findById(id)
    const post = await Postmodel.find({
        user: id
    })

    const follower = await FollowerModel.find({
        followee: id,
        status:"accept"
    })
    const following = await FollowerModel.find({
        follower: id,
        status: "accept"
    })
    return res.status(200).json({
        message: "user is fetch succfully",
        User,
        post,
        follower,
        following
    })
}

module.exports = {
    FollowerController,
    UnFollowerController,
    FetchAllUserController,
    FetchUserByIdController
}