const FollowerModel = require("../models/follower.model")

const GetMyFollowerController = async (req, res) => {
    const myid = req.user.id
    const myFollower = await FollowerModel.find({
        follower: myid,
    })
    return res.status(200).json({
        message: `myFollower fetch successfully `,
        follower: myFollower
    })
}

const GetFollowRequestController = async (req, res) => {
    const followee = req.user.id
    const following = await FollowerModel.find({
        followee: followee,
        status: "pending"
    }).populate("follower", "username fullname profile_image");

    return res.status(200).json({
        message: `FollowRequest fetch successfully `,
        follower: following
    })
}


const FollowRequestAcceptRejController = async (req, res) => {
    const followee = req.user.id
    const followingid = req.params.id
    const { status } = req.body;
    const alreadyfollower = await FollowerModel.findOne({
        _id: followingid,
        followee: followee,
        status: 'pending'
    })
    if (!alreadyfollower) {
        return res.status(409).json({
            message: 'user is not follow'
        })
    }

    await FollowerModel.findByIdAndUpdate(alreadyfollower._id, {
        status: status
    },
    )
    return res.status(200).json({
        message: `you are ${status}`,
    })
}

module.exports = {

    GetFollowRequestController,
    GetMyFollowerController,
    FollowRequestAcceptRejController
}