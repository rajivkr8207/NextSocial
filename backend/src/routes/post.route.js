const express = require('express');
const multer = require('multer');
const { CreatePostController, GetPostController, GetPostUsingParams, PostLikeController, PostUnLikeController, GetMyPostController } = require('../controllers/post.controller');
const IdentifyUser = require('../middleware/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() })
const PostRouter = express.Router()

PostRouter.post('/create', upload.single('imageurl'), IdentifyUser, CreatePostController)
PostRouter.get('/', IdentifyUser, GetPostController)

PostRouter.get('/mypost', IdentifyUser, GetMyPostController)
PostRouter.get('/:id', IdentifyUser, GetPostUsingParams)


/**
 * like post api/post/like/:id
 */
PostRouter.post('/like/:id', IdentifyUser, PostLikeController)
/**
 * like post api/post/like/:id
 */
PostRouter.post('/unlike/:id', IdentifyUser, PostUnLikeController)



module.exports = PostRouter;