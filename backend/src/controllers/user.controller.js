const LikeModel = require("../models/like.model")
const Postmodel = require("../models/post.model")



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
    PostLikeController,
    PostUnLikeController
}