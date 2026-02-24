const express = require('express');
const { CreateBookmark, GetBookMark, DeleteBookmark } = require('../controllers/bookmark.controller');
const IdentifyUser = require('../middleware/auth.middleware');

const BookMarkRouter = express.Router()


BookMarkRouter.post('/create/:postid', IdentifyUser, CreateBookmark)
BookMarkRouter.delete('/delete/:postid', IdentifyUser, DeleteBookmark)
BookMarkRouter.get('/', IdentifyUser, GetBookMark)




module.exports = BookMarkRouter;