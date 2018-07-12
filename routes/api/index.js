'use strict'

const router = require('express').Router()

router.use('/gestionEmpleo/bajas', require('./gestionEmpleo/bajasPersonal'))

module.exports = router