const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { FollowerController, UnFollowerController } = require('../controllers/follower.controller');

const followerRouter = express.Router()

// this is another user id
followerRouter.post('/:id', IdentifyUser, FollowerController)
followerRouter.post('/:id', IdentifyUser, UnFollowerController)

// followerRouter.post('/login', AuthController.LoginController)
// followerRouter.get('/profile', AuthController.ProfileController)



module.exports = followerRouter;