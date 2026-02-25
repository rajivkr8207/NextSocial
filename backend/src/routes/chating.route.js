const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { sentMessage, getAllMessages } = require('../controllers/chating.controller');

const ChatingRouter = express.Router()


ChatingRouter.post('/create', IdentifyUser, sentMessage)
ChatingRouter.get('/message', IdentifyUser, getAllMessages)


module.exports = ChatingRouter;