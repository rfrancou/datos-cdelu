'use strict'

const express = require('express')
const controller = require('./proveedores/registrados.controller')
const router = express.Router()

router.get('/proveedores/registrados', controller.proveedoresRegistradosRubros)

module.exports = router