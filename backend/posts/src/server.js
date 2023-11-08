const express = require('express')
const cors = require('cors')
const server = express()

// Parse json request body
server.use(express.json());

// Enable cors
server.use(cors());
server.options('*', cors());

// The router that contains all posts routes
const postRouter = require('./router/v1/post')

// Init posts router on Express
server.use('/api/v1', postRouter)

server.listen(3000)