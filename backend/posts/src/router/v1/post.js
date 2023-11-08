const express = require('express')
const httpStatus = require('http-status')
const validate = require('../../middleware/validator')
const postValidator = require('../../validator/post')
const postController = require('../../controller/post')

const router = express.Router()

// Example of middleware
router.use((req, res, next) => {
    console.log(`Route called: ${req.method} - ${req.originalUrl}`)
    next()
})

// Get a paginated list of posts
router.get('/posts', validate(postValidator.list), postController.list)

// Get one post by ID
router.get('/posts/:id', (req, res) => {
    res.status(httpStatus.OK).json('About birds')
})

module.exports = router