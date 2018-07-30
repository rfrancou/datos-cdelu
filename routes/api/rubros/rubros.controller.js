'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/rubrosCompras.php'

exports.rubros = (req, res, next) => {
    let url = urlBase
    utils.scrapper(url, false).then((table) => {
        res.json({rubros: table.slice(0, -1)}) // the last element(total) is not necessary
    }, (err) => {
        res.status(404).send({error: err})
    })
}