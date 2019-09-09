'use strict'

global.__base = __dirname + '/';
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cacheUtils = require("./cache-utils")
const ttl = process.env.TTL || 43200000
let app = express()

app.set('port', (process.env.PORT || 5000))
app.use(logger('dev'))

app.use('/api/v1', cacheUtils.cache(ttl), require('./routes/api'))

app.listen(app.get('port'), () => {
  console.log(`Running on PORT --> ${app.get('port')}`)
})