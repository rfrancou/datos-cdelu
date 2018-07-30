'use strict'

const express = require('express')
const proveedoresController = require('./proveedores/registrados.controller')
const rubrosController = require('./rubros.controller')
const router = express.Router()

router.get('/', rubrosController.rubros)
router.get('/:id/proveedores/registrados', proveedoresController.proveedoresRegistradosRubro)
router.get('/proveedores/registrados', proveedoresController.proveedoresRegistradosRubros)


module.exports = router