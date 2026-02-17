const express = require('express');
const multer = require('multer');
const { CreatePostController, GetPostController, GetPostUsingParams } = require('../controllers/post.controller');
const IdentifyUser = require('../middleware/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() })
const PostRouter = express.Router()

PostRouter.post('/create', upload.single('imageurl'), IdentifyUser, CreatePostController)
PostRouter.get('/', IdentifyUser, GetPostController)
PostRouter.get('/:id', IdentifyUser, GetPostUsingParams)



module.exports = PostRouter;