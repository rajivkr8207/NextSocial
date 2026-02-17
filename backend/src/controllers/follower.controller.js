


const FollowerController = async (req, res) => {
    const userid = req.user.id
    const id = req.params.id
    return res.status(200).json({
        id, userid
    })
}

const UnFollowerController = async (req, res) => {
    const userid = req.user.id
    const id = req.params.id
    return res.status(200).json({
        id, userid
    })
}
module.exports = {
    FollowerController,
    UnFollowerController
}