'use strict'

const express = require('express')
const controller = require('./insumos.controller')
const router = express.Router()

router.get('/', controller.gastoTotal)
router.get('/:anio', controller.gastoTotalPorAnio)

module.exports = router