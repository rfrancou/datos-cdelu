'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/'

exports.proveedoresRegistradosRubros = (req, res, next) => {
    let url = `${urlBase}catalogoRubrosProveedores.php`
    utils.scrapper(url, true).then((table) => {
        res.json({rubros: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}

exports.proveedoresRegistradosRubro = (req, res, next) => {
    let id = parseInt(req.params.id)
    let url = `${urlBase}proveedoresPorRubro.php?idRubro=${id}`
    // .php?idRubro=39
    utils.scrapper(url, false).then((table) => {
        res.json({proveedores: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}