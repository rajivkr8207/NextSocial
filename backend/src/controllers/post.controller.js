const Postmodel = require("../models/post.model");
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken');
const LikeModel = require("../models/like.model");
const { Promise } = require("mongoose");
const Bookmarkmodel = require("../models/bookmark.model");
const Usermodel = require("../models/user.model");
const FollowerModel = require("../models/follower.model");

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

// .sort({ createdAt: -1 })
const GetPostController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const posts = await Postmodel.find()
            .populate("user", "username fullname profile_image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const likes = await LikeModel.find();
        const Bookmark = await Bookmarkmodel.find({ user: req.user.id });
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
            isLiked: userLikedSet.has(post._id.toString()),
            isBookmarked: Bookmark.some(bookmark => bookmark.post.toString() === post._id.toString())
        }));
        // Total count for frontend
        const totalPosts = await Postmodel.countDocuments();
        return res.status(200).json({
            message: "Posts fetched successfully",
            page,
            limit,
            totalPosts,
            hasMore: skip + posts.length < totalPosts,
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
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const post = await Postmodel.findOne({
            _id: id,
        }).populate("user", "username fullname profile_image");

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const isLiked = await LikeModel.findOne({
            user: userId,
            post: id,
        });

        return res.status(200).json({
            message: "post is fetch successfully",
            post: {
                ...post._doc,
                isLiked: !!isLiked,  
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};


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

// controllers/user.controller.js

const myFollowersController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userid = req.user.id;

        // Who follows me
        const followers = await FollowerModel.find({
            followee: userid,
            status: "accept"
        })
            .populate("follower", "username fullname profile_image")
            .skip(skip)
            .limit(limit);

        // My outgoing follow records
        const myFollowRecords = await FollowerModel.find({
            follower: userid
        });

        const statusMap = new Map(
            myFollowRecords.map(f => [
                f.followee.toString(),
                f.status
            ])
        );

        const finalFollowers = followers.map(f => ({
            ...f._doc,
            status: statusMap.get(f.follower._id.toString()) || null
        }));

        const total = await FollowerModel.countDocuments({
            followee: userid,
            status: "accept"
        });

        return res.status(200).json({
            message: "Followers fetched",
            page,
            limit,
            hasMore: skip + finalFollowers.length < total,
            followers: finalFollowers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const myFollowingController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userid = req.user.id;

        const following = await FollowerModel.find({
            follower: userid,
            status: "accept"
        })
            .populate("followee", "username fullname profile_image")
            .skip(skip)
            .limit(limit);

        const finalFollowing = following.map(f => ({
            ...f._doc,
            status: "accept"
        }));

        const total = await FollowerModel.countDocuments({
            follower: userid,
            status: "accept"
        });

        return res.status(200).json({
            message: "Following fetched",
            page,
            limit,
            hasMore: skip + finalFollowing.length < total,
            following: finalFollowing
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const otherUsersController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userid = req.user.id;

        const myFollowRecords = await FollowerModel.find({
            follower: userid
        });

        const followStatusMap = new Map(
            myFollowRecords.map(f => [
                f.followee.toString(),
                f.status
            ])
        );

        const followingIds = myFollowRecords
            .filter(f => f.status === "accept")
            .map(f => f.followee);

        const users = await Usermodel.find({
            _id: { $nin: [...followingIds, userid] }
        })
            .select("username fullname profile_image")
            .skip(skip)
            .limit(limit);

        const total = await Usermodel.countDocuments({
            _id: { $nin: [...followingIds, userid] }
        });

        const finalUsers = users.map(user => ({
            ...user._doc,
            status: followStatusMap.get(user._id.toString()) || null
        }));

        return res.status(200).json({
            message: "Other users fetched",
            page,
            limit,
            hasMore: skip + users.length < total,
            users: finalUsers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    CreatePostController,
    GetPostController,
    GetPostUsingParams,
    PostLikeController,
    PostUnLikeController,
    GetMyPostController,
    DeletedPostController,
    myFollowersController,
    myFollowingController,
    otherUsersController
}