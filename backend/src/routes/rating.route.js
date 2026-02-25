const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { GiveRating, getAllRating } = require('../controllers/rating.controller');

const RatingRouter = express.Router()


RatingRouter.post('/create', IdentifyUser, GiveRating)
RatingRouter.get('/all', IdentifyUser, getAllRating)


module.exports = RatingRouter;