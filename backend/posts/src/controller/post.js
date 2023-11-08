const httpStatus = require("http-status");
const postRepository = require('../repository/post')
const list = (req, res) => {
    const posts = postRepository.list(req.limit, req.page)
    res.status(httpStatus.OK).json({data: posts})
}

module.exports = {
    list
}