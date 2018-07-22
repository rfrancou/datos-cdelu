'use strict'

const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/insumosContratados'


/**
 * @api {get} /api/v1/gestioncompras/insumos Importes de cada año gastado en contratos de insumos.
 * @apiName GetContratosAnio
 * @apiVersion 1.0.0
 * @apiGroup Catalogo de insumos contratados
 * @apiSuccess {Object[]}  anios                     Lista con los montos gastados en cada año.
 * @apiSuccess {Number}    anios.anio                Año.
 * @apiSuccess {Number}    anios.importe             Importe gastado.
 * @apiSuccess {Number}    anios.importeporcentaje   Porcentaje del total.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anios": [
 *         {
 *           "anio": 2016,
 *           "importe": 95978494.72,
 *           "porcentajeimporte": 16.62
 *       },
 *       {
 *           "anio": 2017,
 *           "importe": 134480674.89,
 *           "porcentajeimporte": 23.29
 *       },
 *       {
 *           "anio": 2018,
 *           "importe": 84987899.38,
 *           "porcentajeimporte": 14.72
 *       }
 *       ]
 *     }
 *
*/
exports.gastoTotal = (req, res, next) => {
    let url = `${urlBase}.php`
    utils.scrapper(url, false).then((table) => {
        table.reverse()
        res.json({anios: table})
    }, (err) => {
        res.status(404).send({error: err})
    })
}

/**
 * @api {get} /api/v1/gestioncompras/insumos/:anio Importes de cada mes gastado en contratos de insumos.
 * @apiParam {Number {2009-2018}} anio Año para ver los meses.
 * @apiVersion 1.0.0
 * @apiName GetInsumosContratadosPorAnioMes
 * @apiGroup Catalogo de insumos contratados
 * @apiSuccess {Number}    anio                      Año.
 * @apiSuccess {Object[]}  meses                     Lista con los meses de dicho año.
 * @apiSuccess {String}    meses.mes                 Mes.
 * @apiSuccess {Number}    meses.importe             Importe gastado.
 * @apiSuccess {Number}    meses.importeporcentaje   Porcentaje del total.
 *
 * @apiUse BadYearError
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       anio: 2016,
 *         meses: [
 *           {
 *           "mes": "Enero",
 *           "importe": 13671842.83,
 *           "porcentajeimporte": 16.09
 *       },
 *       {
 *           "mes": "Febrero",
 *           "importe": 7473946.23,
 *           "porcentajeimporte": 8.79
 *       },
 *       {
 *           "mes": "Marzo",
 *           "importe": 12614337.1,
 *           "porcentajeimporte": 14.84
 *       }
 *         ]
 *     }
*/
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


/**
 * @api {get} /api/v1/gestioncompras/insumos/:anio/rubros Todos los rubros que realizaron contratos en un determinado año.
 * @apiParam {Number {2009-2018}} anio   Año en particular.
 * @apiName GetRubrosInsumosContratadosAnio
 * @apiVersion 1.0.0
 * @apiGroup Catalogo de insumos contratados
 * @apiSuccess {Number}    anio                         Año.
 * @apiSuccess {Object[]}  rubros                       Lista de rubros.
 * @apiSuccess {Number}    rubros.idrubro               idrubro.
 * @apiSuccess {String}    rubros.codigorubro           Codigo del rubro.
 * @apiSuccess {String}    rubros.nombrerubro           Nombre del rubro.
 * @apiSuccess {Number}    rubros.importe               Importe gastado.
 * @apiSuccess {Number}    rubros.importeporcentaje     Porcentaje del total.
 * 
 * @apiUse BadYearError 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anio": 2015,
 *       "rubros": [
 *         {
 *          "id": 39,
 *           "codigorubro": "ALOJ",
 *           "nombrerubro": "ALOJAMIENTO",
 *           "importe": 198123.01,
 *           "porcentajeimporte": 0.21
 *       },
 *       {
 *           "id": 24,
 *           "codigorubro": "ALQM",
 *           "nombrerubro": "ALQUILER MAQUINAS VIALES",
 *           "importe": 3064893,
 *           "porcentajeimporte": 3.19
 *       },
 *       {
 *           "id": 1,
 *           "codigorubro": "BAZA",
 *           "nombrerubro": "BAZAR",
 *           "importe": 14934.88,
 *           "porcentajeimporte": 0.02
 *       }
 *       ]
 *     }
 *
*/
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
  