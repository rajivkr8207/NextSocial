const Chatmodel = require("../models/Chating.model");



const sentMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const chatcrete = await Chatmodel.create({
            message,
            user: req.user.id
        })
        res.status(201).json({ message: "Message sent successfully", chatcrete });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const getAllMessages = async (req, res) => {
    try {
        const messages = await Chatmodel.find({ ishidden: false }).populate("user", "username email profile_image")
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    sentMessage,
    getAllMessages
}
