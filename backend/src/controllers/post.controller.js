const Postmodel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');
const LikeModel = require("../models/like.model");

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT,
});

const CreatePostController = async (req, res) => {
    const { caption } = req.body
    const file = req.file

    const imgurl = await client.files.upload({
        file: await toFile(Buffer.from(file.buffer), 'file'),
        fileName: 'test',
    });

    const post = await Postmodel.create({
        caption,
        user: req.user.id,
        imgUrl: imgurl.url
    })
    return res.status(201).json({
        message: 'post is created successfully',
        post
    })
}


const GetPostController = async (req, res) => {
    const Allpost = await Postmodel.find()
    return res.status(200).json({
        message: 'post is fetch successfully',
        Allpost
    })
}

const GetMyPostController = async (req, res) => {
    const mypost = await Postmodel.find({
        user: req.user.id
    })
    return res.status(200).json({
        message: 'mypost is fetch successfully',
        mypost
    })
}

const GetPostUsingParams = async (req, res) => {
    const id = req.params.id
    const post = await Postmodel.findOne({
        _id: id,
        user: req.user.id
    })
    return res.status(200).json({
        message: 'post is fetch successfully',
        post
    })
}


const PostLikeController = async (req, res) => {
    const userid = req.user.id
    const postid = req.params.id

    const postexits = await Postmodel.findOne({ _id: postid })

    if (!postexits) {
        return res.status(404).json({
            message: 'post is not exist'
        })
    }
    const alreadylike = await LikeModel.findOne({
        post: postid,
        user: userid
    })

    if (alreadylike) {
        return res.status(409).json({
            message: 'like already exist'
        })
    }
    const like = await LikeModel.create({
        post: postid,
        user: userid
    })

    return res.status(201).json({
        message: "you are like post",
        like
    })

}

const PostUnLikeController = async (req, res) => {
    const userid = req.user.id
    const postid = req.params.id

    const postexits = await Postmodel.findOne({ _id: postid })

    if (!postexits) {
        return res.status(404).json({
            message: 'post is not exist'
        })
    }

    const like = await LikeModel.findOne({
        post: postid,
        user: userid
    })
    if (!like) {
        return res.status(404).json({
            message: 'like is not exist'
        })
    }
    await LikeModel.findByIdAndDelete(like.id)

    return res.status(200).json({
        message: "you are unlike the post",
    })
}


module.exports = {
    CreatePostController,
    GetPostController,
    GetPostUsingParams,
    PostLikeController,
    PostUnLikeController,
    GetMyPostController
}