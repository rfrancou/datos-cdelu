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