'use strict'

global.__base = __dirname + '/';
const express = require('express')
const logger = require('morgan')
const path = require('path')

let app = express()

app.set('port', (process.env.PORT || 5000))
app.use(logger('dev'))

app.use('/api/v1', require('./routes/api'))

app.listen(app.get('port'), () => {
  console.log(`Running on PORT --> ${app.get('port')}`)
})