'use strict'

const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/insumosContratados'

exports.gastoTotal = (req, res, next) => {
    let url = `${urlBase}.php`
    utils.scrapper(url, false).then((table) => {
        table.reverse()
        res.json({anios: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}

exports.gastoTotalPorAnio = (req, res, next) => {
    let year = parseInt(req.params.anio)
    if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }
  
    let url = `${urlBase}AM.php?anio=${year}`
    utils.scrapper(url, false).then((table) => {
      res.json({anio: year, meses: table})
    }, (err) => {
      res.status(404).send({error: err})
    })
  }

  exports.rubrosAnio =  (req, res, next) => {
    let year = parseInt(req.params.anio)
    if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }
  
    let url = `${urlBase}AR.php?anio=${year}`
    utils.scrapper(url, true).then((table) => {
      res.json({anio: year, rubros: table})
    }, (err) => {
      res.status(404).send({error: err})
    })
  }
  