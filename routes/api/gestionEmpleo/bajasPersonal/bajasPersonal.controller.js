'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/bajasPersonal'

exports.bajas = (req, res, next) => {
  let url = `${urlBase}.php`
  utils.scrapper(url, false).then((table) => {
    res.json({bajas: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}

exports.bajasMotivosAnio = (req, res, next) => {
  let year = parseInt(req.params.anio)
  if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }

  let url = `${urlBase}M.php?anio=${year}`
  utils.scrapper(url, true).then((table) => {
    res.json({anio: year, motivos: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}
