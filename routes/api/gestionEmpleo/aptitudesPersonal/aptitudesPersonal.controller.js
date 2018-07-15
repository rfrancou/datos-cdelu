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
