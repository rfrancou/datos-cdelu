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

