const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { FollowerController, UnFollowerController, FollowRequestAcceptRejController, GetFollowRequestController, GetMyFollowerController } = require('../controllers/follower.controller');

const followerRouter = express.Router()

followerRouter.post('/follow/:id', IdentifyUser, FollowerController)
followerRouter.post('/unfollow/:id', IdentifyUser, UnFollowerController)
followerRouter.get('/following', IdentifyUser, GetFollowRequestController)
followerRouter.get('/myfollower', IdentifyUser, GetMyFollowerController)
followerRouter.patch('/following', IdentifyUser, FollowRequestAcceptRejController)


module.exports = followerRouter;