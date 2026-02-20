const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route')
const app = express()
// const multer  = require('multer')
const PostRouter = require('./routes/post.route')
const followerRouter = require('./routes/follower.route')
const UserRouter = require('./routes/user.route')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.static('./public/frontend'))
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}))


app.use('/api/auth', authRouter)
app.use('/api/post', PostRouter)
app.use('/api/follower', followerRouter)
app.use('/api/user', UserRouter)




module.exports = app