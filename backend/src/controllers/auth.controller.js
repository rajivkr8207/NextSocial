const Usermodel = require("../models/user.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const FollowerModel = require("../models/follower.model");
const Postmodel = require("../models/post.model");

const RegisterController = async (req, res) => {
    const { fullname, username, email, password, bio } = req.body
    console.log(username, email, fullname);
    const isUseralreadyexist = await Usermodel.findOne({ username })

    if (isUseralreadyexist) {
        return res.status(409).json({
            message: 'user is already exist'
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)


    const user = await Usermodel.create({
        username,
        fullname,
        email,
        password: hashPassword,
        bio
    })

    return res.status(201).json({
        message: "user Register successfully",
        user: {
            fullname: user.fullname,
            email: user.email
        }
    })
}



const LoginController = async (req, res) => {
    const { username, email, password } = req.body

    const isUseralreadyexist = await Usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select('+password')
    if (!isUseralreadyexist) {
        return res.status(409).json({
            message: 'user is  not exist'
        })
    }

    const isPassword = await bcrypt.compare(password, isUseralreadyexist.password)
    if (!isPassword) {
        return res.status(409).json({
            message: 'invalid credintial'
        })
    }
    const token = jwt.sign({ id: isUseralreadyexist._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.cookie('instatoken', token)
    return res.status(200).json({
        message: "user login successfully",
        token,
        user: {
            id: isUseralreadyexist._id,
            username: isUseralreadyexist.username,
            email: isUseralreadyexist.email,
            fullname: isUseralreadyexist.fullname,
        }
    })
}


const ProfileController = async (req, res) => {
    const id = req.user.id
    const user = await Usermodel.findOne({ _id: id })
    const post = await Postmodel.find({ user: id })
    const follower = await FollowerModel.find({
        followee: id,
        status: "accept"
    })
    const following = await FollowerModel.find({
        follower: id,
        status: "accept"
    })
    return res.status(200).json({
        message: "profile fetch successfully",
        user,
        post,
        follower,
        following
    })
}
const userController = async (req, res) => {
    return res.status(200).json({ user: req.user });
}

const LogoutController = (req, res) => {
    res.clearCookie('instatoken');
    res.status(200).json({
        message: "Logout successful"
    });
}

const AllUserDataFetch = async (req, res) => {
    const allUser = await Usermodel.find()
    return res.status(200).json({
        message: "all user is fetch",
        allUser: allUser
    })
}

const uniqueUserFetch = async (req, res) => {
    const id = req.params.id
    const uniqueUser = await Usermodel.findOne({
        _id: id
    })
    return res.status(200).json({
        message: "all user is fetch",
        user: uniqueUser
    })
}

module.exports = {
    RegisterController,
    LoginController,
    ProfileController,
    LogoutController,
    AllUserDataFetch,
    uniqueUserFetch,
    userController
}