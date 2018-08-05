'use strict'

const express = require('express')
const router = require('express').Router()
const proveedoresController = require('./proveedores.controller')

router.get('/', proveedoresController.proveedores)
router.get('/:anio', proveedoresController.proveedoresPorAnio)
router.get('/:anio/meses', proveedoresController.proveedoresPorAnioMeses)

module.exports = router