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