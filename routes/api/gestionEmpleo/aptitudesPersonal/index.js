'use strict'

const express = require('express')
const controller = require('./aptitudesPersonal.controller')
const router = express.Router()

router.get('/', controller.all)
router.get('/:anio', controller.allPorAnio)

module.exports = router
