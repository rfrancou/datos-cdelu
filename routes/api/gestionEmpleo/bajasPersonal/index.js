'use strict'

const express = require('express')
const controller = require('./bajasPersonal.controller')
const router = express.Router()

router.get('/', controller.bajas)
router.get('/:anio/motivos', controller.bajasMotivosAnio)
router.get('/:anio/convenios', controller.bajasConveniosAnio)

module.exports = router
