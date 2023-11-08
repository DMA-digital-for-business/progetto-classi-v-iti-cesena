const express = require('express')
const httpProxy = require('express-http-proxy')
const server = express()
const firebase= require('firebase-admin');
const fs= require('fs');

const serviceAccount = require(`${__dirname}/config/firebase_service_account.json`);

// Initialize Firebase package with service account authentication
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

// -- Authenticate the incoming request using Google Firebase Authentication service
server.use(async (req, res, next) => {
    console.log('Checking authentication ...')

    // Block the request without spending time to validate an empty token
    if(!req.headers.authorization){
        return res.status(401).json({error: 'Please, send authentication header.'})
    }

    try{
        // verify the given token: if valid the return value will be the logged user
        const authResult = await firebase.auth().verifyIdToken(req.headers.authorization)

        // If all went correctly print something to celebrate the event and enrich the request with auth data
        console.log(`Hello there: ${authResult.email}`)

        // The request can proceed to the destination
        next()
    }catch(e){
        console.log(e)
        return res.status(401).json({error: `Unauthorized`})
    }
})

// -- Setup hosts dynamically via config file
// Fetch hosts data from file
const hostsConfig = fs.readFileSync(`${__dirname}/config/hosts.json`)

// Convert data from buffer to JS object
const hosts = JSON.parse(hostsConfig.toString()) // TODO catch format exception

// For each host in config, set a proxy and build the route table
for (const host of hosts) {

    const proxyRoute = `http://${host.domain}:${host.port}/api/v1/${host.prefix}`
    const postServiceProxy = httpProxy(proxyRoute)

    console.log(`Setting up route: ${proxyRoute}`)

    // Proxy request
    server.all(`/api/v1/${host.prefix}*`, (req, res, next) => {
        postServiceProxy(req, res, next)
    })
}

server.listen(3000, () => console.log('Gateway up and running.'))