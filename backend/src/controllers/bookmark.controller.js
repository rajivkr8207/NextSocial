const Bookmarkmodel = require("../models/bookmark.model");



const CreateBookmark = async (req, res) => {
    const postid = req.params.postid;
    const userid = req.user.id;
    try {
        const existingBookmark = await Bookmarkmodel.findOne({ post: postid, user: userid });
        if (existingBookmark) {
            return res.status(400).json({ message: 'Bookmark already exists' });
        }
        const bookmark = await Bookmarkmodel.create({ post: postid, user: userid });
        return res.status(201).json({
            message: 'Bookmark created successfully',
            bookmark: bookmark
        });
    } catch (error) {
        console.error('Error creating bookmark:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const DeleteBookmark = async (req, res) => {
    const postid = req.params.postid;
    const userid = req.user.id;
    try {
        const bookmark = await Bookmarkmodel.findOne({ post: postid, user: userid });
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        await Bookmarkmodel.findByIdAndDelete(bookmark._id);
        return res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const GetBookMark = async (req, res) => {
    const userid = req.user.id;
    try {
        const bookmark = await Bookmarkmodel.find({ user: userid })
        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        return res.status(200).json({
            message: "Bookmark fetched",
            bookmark
        })
    } catch (error) {

    }
}


module.exports = { CreateBookmark, DeleteBookmark, GetBookMark }