'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/catalogoRubrosProveedores'

exports.proveedoresRegistradosRubros = (req, res, next) => {
    let url = `${urlBase}.php`
    utils.scrapper(url, true).then((table) => {
        res.json({rubros: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}