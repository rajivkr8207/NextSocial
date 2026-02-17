const FollowerModel = require("../models/follower.model")
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
        return res.status(409).json({
            message: 'allready exist in following '
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

const GetMyFollowerController = async (req,res)=>{
    const myid = req.user.id
    const myFollower = await FollowerModel.find({
        follower: myid,
        status: 'accept'
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
        status: 'pending'
    })
    return res.status(200).json({
        message: `FollowRequest fetch successfully `,
        follower: following
    })
}


const FollowRequestAcceptRejController = async (req, res) => {
    const followee = req.user.id
    // const folloingid = req.params.id
    const { status } = req.body;
    const alreadyfollower = await FollowerModel.findOne({

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
    FollowerController,
    UnFollowerController,
    GetFollowRequestController,
    GetMyFollowerController,
    FollowRequestAcceptRejController
}