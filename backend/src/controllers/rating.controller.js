const Ratingmodel = require("../models/rating.model");



const GiveRating = async (req, res) => {
    try {
        const { rating, message } = req.body;
        const alreadyRated = await Ratingmodel.findOne({ user: req.user.id });
        if (alreadyRated) {
            return res.status(400).json({ message: "You have already given a rating" });
        }
        const chatcrete = await Ratingmodel.create({
            rating,
            message,
            user: req.user.id
        })
        res.status(201).json({ message: "Rating sent successfully", chatcrete });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const getAllRating = async (req, res) => {
    try {
        const alreadyRated = await Ratingmodel.findOne({ user: req.user.id });
        let yourRating = null;
        if (alreadyRated) {
            yourRating = alreadyRated.rating;
        }
        const messages = await Ratingmodel.find({ ishidden: false }).populate("user", "username email profile_image")

        return res.status(200).json({ messages, yourRating });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    GiveRating,
    getAllRating
}
