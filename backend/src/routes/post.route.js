const express = require('express');
const multer = require('multer');
const { CreatePostController, GetPostController, GetPostUsingParams, PostLikeController, PostUnLikeController, GetMyPostController, DeletedPostController } = require('../controllers/post.controller');
const IdentifyUser = require('../middleware/auth.middleware');
const PostRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage() })


PostRouter.post('/create', upload.single('imageurl'), IdentifyUser, CreatePostController)
PostRouter.get('/', IdentifyUser, GetPostController)

PostRouter.get('/mypost', IdentifyUser, GetMyPostController)
PostRouter.get('/:id', IdentifyUser, GetPostUsingParams)
PostRouter.delete('/:id', IdentifyUser, DeletedPostController)

/**
 * like post api/post/like/:id
 */
PostRouter.post('/like/:id', IdentifyUser, PostLikeController)
/**
 * like post api/post/like/:id
 */
PostRouter.post('/unlike/:id', IdentifyUser, PostUnLikeController)



module.exports = PostRouter;