const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { FollowRequestAcceptRejController, GetFollowRequestController, GetMyFollowerController } = require('../controllers/follower.controller');

const followerRouter = express.Router()


followerRouter.get('/request', IdentifyUser, GetFollowRequestController);
followerRouter.patch('/request/accrej/:id', IdentifyUser, FollowRequestAcceptRejController);

//user follow me 
followerRouter.get('/myfollower', IdentifyUser, GetMyFollowerController);




module.exports = followerRouter;