'use strict'

const express = require('express')
const controller = require('./insumos.controller')
const router = express.Router()

router.get('/', controller.gastoTotal)

module.exports = router