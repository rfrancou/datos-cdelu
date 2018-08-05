'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/proveedoresContratados'

exports.proveedores = (req, res, next) => {
    let url = `${urlBase}.php`
    utils.scrapper(url, false).then((table) => {
        res.json({proveedores: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}

exports.proveedoresPorAnio = (req, res, next) => {
    let year = parseInt(req.params.anio)
    if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }

    let url = `${urlBase}AP.php?anio=${year}`
    utils.scrapper(url, true).then((table) => {
        res.json({anio: year, meses: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}

exports.proveedoresPorAnioMeses = (req, res, next) => {
    let year = parseInt(req.params.anio)
    if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }

    let url = `${urlBase}AM.php?anio=${year}`
    utils.scrapper(url, false).then((table) => {
        res.json({anio: year, meses: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}