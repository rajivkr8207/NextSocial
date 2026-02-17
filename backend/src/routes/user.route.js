const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { PostLikeController, PostUnLikeController } = require('../controllers/user.controller');

const UserRouter = express.Router()

UserRouter.post('/post/like/:id', IdentifyUser, PostLikeController)
UserRouter.post('/post/unlike/:id', IdentifyUser, PostUnLikeController)



module.exports = UserRouter;