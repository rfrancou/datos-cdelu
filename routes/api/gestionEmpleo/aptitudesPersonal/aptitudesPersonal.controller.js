'use strict'

const utils = require(__base + '/scrapper')
const urlBase = 'http://www.cdeluruguay.gob.ar/datagov/aptitudesPersonal'

/**
 * @api {get} /api/v1/gestionEmpleo/aptitudes   Aptitudes Del Personal
 * @apiName GetAptitudes
 * @apiGroup Gestion Del Empleo
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]}  anios                     Lista con todos los años.
 * @apiSuccess {Number}    anios.anio                Año.
 * @apiSuccess {Number}    anios.universitario       Cantidad de personal con titulo universitario.
 * @apiSuccess {Number}    anios.terciario           Cantidad de personal con titulo terceario.
 * @apiSuccess {Number}    anios.secundario          Cantidad de personal con titulo secundario.
 * @apiSuccess {Number}    anios.ninguno             Cantidad de personal con ningun titulo.
 * @apiSuccess {Number}    anios.sindeclarar         Cantidad de personal sin declarar aptitudes.
 * @apiSuccess {Number}    anios.total               Cantidad total de personal.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anios": [
 *         {
 *            "anio": 2016,
 *            "universitario": 52,
 *            "terciario": 90,
 *            "secundario": 184,
 *            "ninguno": 8,
 *            "sindeclarar": 331,
 *            "total": 665
 *        },
 *        {
 *            "anio": 2017,
 *            "universitario": 52,
 *            "terciario": 84,
 *            "secundario": 183,
 *            "ninguno": 9,
 *            "sindeclarar": 345,
 *            "total": 673
 *        },
 *        {
 *            "anio": 2018,
 *            "universitario": 52,
 *            "terciario": 83,
 *            "secundario": 191,
 *            "ninguno": 7,
 *            "sindeclarar": 331,
 *            "total": 663
 *        }
 *       ]
 *     }
 *
*/
exports.all = (req, res, next) => {
  let url = `${urlBase}.php`
  utils.scrapperTableWithTitle(url, false).then((table) => {
    table.reverse()
    res.json({anios: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}

/**
 * @api {get} /api/v1/gestionEmpleo/aptitudes/:anio Aptitudes del personal en año determinado mes a mes.
 * @apiParam {Number {2009-2018}}   anio Año para ver los meses.
 * @apiName GetAptitudesAnio
 * @apiVersion 1.0.0
 * @apiGroup Gestion Del Empleo
 * @apiSuccess {Number}    anio                      Año.
 * @apiSuccess {Object[]}  meses                     Lista con todos los meses.
 * @apiSuccess {String}    meses.mes                 Mes.
 * @apiSuccess {Number}    meses.universitario       Cantidad de personal con titulo universitario.
 * @apiSuccess {Number}    meses.terciario           Cantidad de personal con titulo terceario.
 * @apiSuccess {Number}    meses.secundario          Cantidad de personal con titulo secundario.
 * @apiSuccess {Number}    meses.ninguno             Cantidad de personal con ningun titulo.
 * @apiSuccess {Number}    meses.sindeclarar         Cantidad de personal sin declarar aptitudes.
 * @apiSuccess {Number}    meses.total               Cantidad total de personal.
 *
 * @apiUse BadYearError 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anio": 2016,
 *       "meses": [
 *         {
 *            "mes": "Enero",
 *            "universitario": 52,
 *            "terciario": 85,
 *            "secundario": 182,
 *            "ninguno": 10,
 *            "sindeclarar": 345,
 *            "total": 674
 *        },
 *        {
 *            "mes": "Febrero",
 *            "universitario": 52,
 *            "terciario": 86,
 *            "secundario": 181,
 *            "ninguno": 9,
 *            "sindeclarar": 345,
 *            "total": 673
 *        },
 *        {
 *            "mes": "Marzo",
 *            "universitario": 52,
 *            "terciario": 85,
 *            "secundario": 181,
 *            "ninguno": 9,
 *            "sindeclarar": 345,
 *            "total": 672
 *        }
 *       ]
 *     }
 *
*/
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

/**
 * @api {get} /api/v1/gestionEmpleo/aptitudes/:anio/:mes Aptitudes del personal por secciones en un mes y año determinado
 * @apiParam {Number {2009-2018}}   anio Año para ver los meses.
 * @apiParam {Number {1-12}} mes Mes del año.
 * @apiVersion 1.0.0
 * @apiName GetAptitudesAnioMes
 * @apiGroup Gestion Del Empleo
 * @apiSuccess {Number}    anio                          Año.
 * @apiSuccess {Number}    mes                           Mes.
 * @apiSuccess {Object[]}  secciones                     Lista de aptitudes del personal en cada seccion en un año y mes determinado.
 * @apiSuccess {String}    secciones.secretaria          Secreataria a la que pertenece.
 * @apiSuccess {String}    secciones.area                Area a la que pertenece.
 * @apiSuccess {Number}    secciones.universitario       Cantidad de personal con titulo universitario.
 * @apiSuccess {Number}    secciones.terciario           Cantidad de personal con titulo terceario.
 * @apiSuccess {Number}    secciones.secundario          Cantidad de personal con titulo secundario.
 * @apiSuccess {Number}    secciones.ninguno             Cantidad de personal con ningun titulo.
 * @apiSuccess {Number}    secciones.sindeclarar         Cantidad de personal sin declarar aptitudes.
 * @apiSuccess {Number}    secciones.total               Cantidad total de personal.
 *
 * @apiUse BadYearError 
 * @apiUse BadMothError 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "anio": 2016,
 *       "mes": 1,
 *       "secciones": [
 *          {
  *            "secretaría": "COORDINACION GENERAL DE EVALUACION POLITICAS PUBLICAS Y CONTROL DE GASTOS",
  *            "área": "COORDINACION GENERAL DE EVALUACION POLITICAS PUBLI",
  *            "universitario": 1,
  *            "terciario": 0,
  *            "secundario": 0,
  *            "ninguno": 0,
  *            "sindeclarar": 0,
  *            "total": 1
  *        },
  *        {
  *            "secretaría": "COORDINACION GENERAL DE EVALUACION POLITICAS PUBLICAS Y CONTROL DE GASTOS",
  *            "área": "DIV. CONTADURIA",
  *            "universitario": 0,
  *            "terciario": 0,
  *            "secundario": 4,
  *            "ninguno": 0,
  *            "sindeclarar": 0,
  *            "total": 4
  *        }
 *       ]
 *     }
 *
*/
exports.allSeccionesAnioMes = (req, res, next) => {
  let year = parseInt(req.params.anio)
  let month = parseInt(req.params.mes)
  if (!utils.validateYear(year)) { return res.status(400).json({error: 'Año incorrecto'}) }
  if (!utils.validateMonth(month)) { return res.status(400).json({error: 'Mes incorrecto'}) }

  let url = `${urlBase}S.php?anio=${year}&mes=${month}`
  utils.scrapperTableWithTitle(url, true).then((table) => {
    res.json({anio: year, mes: month, secciones: table})
  }, (err) => {
    res.status(404).send({error: err})
  })
}
