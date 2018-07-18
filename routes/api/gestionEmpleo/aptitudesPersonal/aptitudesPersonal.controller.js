'use strict'

const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/aptitudesPersonal'

exports.all = (req, res, next) => {
  let url = `${urlBase}.php`
  utils.scrapperTableWithTitle(url, false).then((table) => {
    table.reverse()
    res.json({anios: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}

exports.allPorAnio = (req, res, next) => {
  let year = parseInt(req.params.anio)
  if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }

  let url = `${urlBase}M.php?anio=${year}`
  utils.scrapperTableWithTitle(url, false).then((table) => {
    res.json({anio: year, meses: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}
