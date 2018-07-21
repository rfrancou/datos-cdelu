'use strict'

const express = require('express')
const controller = require('./insumos.controller')
const router = express.Router()

router.get('/', controller.gastoTotal)
router.get('/:anio', controller.gastoTotalPorAnio)
router.get('/:anio/rubros',controller.rubrosAnio)

module.exports = router