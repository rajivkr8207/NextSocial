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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const allUser = await Usermodel.find({
        _id: { $ne: myid }
    })
        .skip(skip)
        .limit(limit)
    const totalUser = await Usermodel.countDocuments({
        _id: { $ne: myid }
    })
    return res.status(200).json({
        message: "user is fetch succfully",
        allUser,
        totalUser,
        hasMore: skip + allUser.length < totalUser
    })
}

// controllers/user.controller.js

const SearchUserController = async (req, res) => {
    try {
        const { query } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        // Case-insensitive username search
        const users = await Usermodel.find({
            username: { $regex: query, $options: "i" }
        })
            .select("username fullname profile_image")
            .skip(skip)
            .limit(limit);

        const totalUsers = await Usermodel.countDocuments({
            username: { $regex: query, $options: "i" }
        });

        return res.status(200).json({
            message: "Users fetched successfully",
            page,
            limit,
            totalUsers,
            hasMore: skip + users.length < totalUsers,
            users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};



const FetchUserByIdController = async (req, res) => {
    const id = req.params.id
    const User = await Usermodel.findById(id)
    const post = await Postmodel.find({
        user: id
    })

    const follower = await FollowerModel.find({
        followee: id,
        status: "accept"
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
    FetchUserByIdController,
    SearchUserController
}