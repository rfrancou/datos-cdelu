'use strict'

const router = require('express').Router()
const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/bajasPersonal'

/**
 * @apiDefine BadYearError
 *
 * @apiError BadYearRequest El parametro año se encuentra fuera del rango definido.
 *
 * @apiErrorExample {json} Error-Anio-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Año incorrecto"
 *     }
 */

 /**
 * @apiDefine BadMothError
 *
 * @apiError BadMonthRequest El parametro mes se encuentra fuera del rango definido.
 *
 * @apiErrorExample {json} Error-Mes-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Mes incorrecto"
 *     }
 */

/**
 * @api {get} /api/v1/gestionEmpleo/bajas   Bajas de personal
 * @apiName GetBajas
 * @apiVersion 1.0.0
 * @apiGroup Gestion Del Empleo
 * @apiSuccess {Object[]}  bajas                     Lista con la cantidad de bajas en cada año.
 * @apiSuccess {Number}    bajas.anio                Año.
 * @apiSuccess {Number}    bajas.cantidaddebajas     Cantidad de bajas en el año.
 * @apiSuccess {Number}    bajas.porcentajedebajas   Porcentaje de bajas.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "bajas": [
 *         {
 *            "anio": 2010,
 *             "cantidaddebajas": 36,
 *            "porcentajedebajas": 7.13
 *         },
 *        {
 *           "anio": 2009,
 *           "cantidaddebajas": 36,
 *           "porcentajedebajas": 7.13
 *         }
 *       ]
 *     }
 *
*/
exports.bajas = (req, res, next) => {
  let url = `${urlBase}.php`
  utils.scrapper(url, false).then((table) => {
    res.json({bajas: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}

/**
 * @api {get} /api/v1/gestionEmpleo/bajas/:anio/motivos   Motivos por los cuales se dio de baja en año determinado.
 * @apiParam {Number {2009-2018}}   anio           Año.
 * @apiName GetBajasAnioMotivos
 * @apiVersion 1.0.0
 * @apiGroup Gestion Del Empleo
 * @apiSuccess {Number}    anio                         Año.
 * @apiSuccess {Object[]}  motivos                      Lista con todos los motivos de bajas.
 * @apiSuccess {Number}    motivos.id                   ID del motivo.
 * @apiSuccess {String}    motivos.motivo               Nombre del motivo.
 * @apiSuccess {Number}    motivos.cantidaddebajas      Cantidad de bajas.
 * @apiSuccess {Number}    motivos.porcentajedebajas    Porcentaje de bajas.
 *
 * @apiUse BadYearError 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anio": 2016,
 *       "motivos": [
 *         {
 *            "id": 4,
 *            "motivo": "JUBILACION POR INVALIDEZ",
 *            "cantidaddebajas": 1,
 *           "porcentajedebajas": 3.57
 *        },
 *        {
 *           "id": 1,
 *           "motivo": "RENUNCIA",
 *           "cantidaddebajas": 6,
 *           "porcentajedebajas": 21.43
 *        }
 *       ]
 *     }
 *
*/
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

/**
 * @api {get} /api/v1/gestionEmpleo/bajas/:anio/convenios   Convenios que tenia el personal dado de baja en un año determinado.
 * @apiParam {Number {2009-2018}}   anio           Año.
 * @apiName GetBajasAnioConvenios
 * @apiVersion 1.0.0
 * @apiGroup Gestion Del Empleo
 * @apiSuccess {Number}    anio                         Año.
 * @apiSuccess {Object[]}  convenios                      Lista con todos los convenios.
 * @apiSuccess {Number}    convenios.id                   ID del convenio.
 * @apiSuccess {String}    convenios.convenio             Nombre del convenio.
 * @apiSuccess {Number}    convenios.cantidaddebajas      Cantidad de bajas.
 * @apiSuccess {Number}    convenios.porcentajedebajas    Porcentaje de bajas.
 *
 * @apiUse BadYearError 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "anio": 2018,
 *           "convenios": [
 *               {
 *                   "id": 2,
 *                   "convenio": "Planta Política",
 *                   "cantidaddebajas": 4,
 *                   "porcentajedebajas": 16.67
 *               },
 *               {
 *                   "id": 1,
 *                   "convenio": "Planta Permanente",
 *                   "cantidaddebajas": 16,
 *                   "porcentajedebajas": 66.67
 *               },
 *               {
 *                   "id": 3,
 *                   "convenio": "Contratados Y Otros",
 *                   "cantidaddebajas": 4,
 *                   "porcentajedebajas": 16.67
 *               }
 *           ]
 *       }
 *
*/
exports.bajasConveniosAnio = (req, res, next) => {
  let year = parseInt(req.params.anio)
  if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }

  let url = `${urlBase}C.php?anio=${year}`
  utils.scrapper(url, true).then((table) => {
    res.json({anio: year, convenios: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}
