'use strict'
var mcache = require('memory-cache');
exports.cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            console.log("Data obtained from cache...")
            res.setHeader('Content-Type', 'application/json');
            res.send(cachedBody)
            return
        } else {
            console.log("Not found in cache, sending data...")
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration);
                res.sendResponse(body)
            }
            next()
        }
    }
}