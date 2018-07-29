'use strict'

const router = require('express').Router()

router.use('/gestionEmpleo/aptitudes', require('./gestionEmpleo/aptitudesPersonal'))
router.use('/gestionEmpleo/bajas', require('./gestionEmpleo/bajasPersonal'))
router.use('/gestionCompras/insumos', require('./gestionCompras/insumos'))

router.use('/rubros', require('./rubros'))

module.exports = router