const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { PostLikeController, PostUnLikeController, FollowerController, UnFollowerController, FetchAllUserController, FetchUserByIdController } = require('../controllers/user.controller');

const UserRouter = express.Router()

UserRouter.get('/alluser', IdentifyUser, FetchAllUserController)

UserRouter.get('/:id', IdentifyUser, FetchUserByIdController)

UserRouter.post('/follow/:id', IdentifyUser, FollowerController)

UserRouter.post('/unfollow/:id', IdentifyUser, UnFollowerController)



module.exports = UserRouter;