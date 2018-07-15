'use strict'

const express = require('express')
const controller = require('./aptitudesPersonal.controller')
const router = express.Router()

router.get('/', controller.all)

module.exports = router
