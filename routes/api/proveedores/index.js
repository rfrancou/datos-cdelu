'use strict'

const express = require('express')
const router = require('express').Router()
const proveedoresController = require('./proveedores.controller')

router.get('/', proveedoresController.proveedores)
router.get('/:anio', proveedoresController.proveedoresPorAnio)


module.exports = router