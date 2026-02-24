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
        fileName: `post_${Date.now()}`,
        folder: "/instaclone/post"
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

const DeletedPostController = async (req, res) => {
    const id = req.params.id
    const post = await Postmodel.findOneAndDelete({
        _id: id,
        user: req.user.id
    })
    if (!post) {
        return res.status(404).json({
            message: 'post is not exist'
        })
    }
    return res.status(200).json({
        message: 'post is deleted successfully',
        post
    })
}

const GetPostController = async (req, res) => {
    try {
        const posts = await Postmodel.find()
            .populate("user", "username fullname profile_image")
            .sort({ createdAt: -1 });

        const likes = await LikeModel.find();

        const likeCountMap = {};

        likes.forEach(like => {
            const postId = like.post.toString();
            likeCountMap[postId] = (likeCountMap[postId] || 0) + 1;
        });

        const userLikedSet = new Set(
            likes
                .filter(like => like.user.toString() === req.user.id)
                .map(like => like.post.toString())
        );

        const finalPosts = posts.map(post => ({
            ...post._doc,
            likesCount: likeCountMap[post._id.toString()] || 0,
            isLiked: userLikedSet.has(post._id.toString())
        }));

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: finalPosts
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


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
    GetMyPostController,
    DeletedPostController
}