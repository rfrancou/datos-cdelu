'use strict'

const request = require('request')
const cheerio = require('cheerio')

exports.validateYear = function (year) {
  return year > 2008 && year < 2019
}

exports.validateMonth = function (month) {
  return month > 0 && month < 13
}

function removeSpacesAndSpecialCharacters(value){
  return value.toLowerCase()
              .split(' ')
              .join('')
              .replace('ñ', 'ni')
              .replace('ó', 'o')
              .split('.').join('')
}

function fixNumbers(items){
  items.forEach((x) => {
    for (let key in x) {
      if (x[key] !== undefined) {
        if (x[key].match(/\d[\,\.]{1}\d/) !== null) {
          x[key] = parseFloat(x[key].split('.').join('').replace(',', '.'))
        } else if (isNaN(x[key]) === false) {
          x[key] = parseInt(x[key])
        }
      }
    }
  })
  return items
}

/**
 * @param {String} url - url for scrapping.
 * @param {Boolean} id - to know if exists a link in header of the table.
*/
exports.scrapper = function (url, id) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err || response.statusCode === 404) { reject(new Error('Not Found')) }

      const $ = cheerio.load(body)

      var items = [] // arr for store all obj (each row is an obj)
      var headerTable = [] // header of the table (each one will be a field of each obj)

      // get header table - removes spaces and special characters
      $('tr.tituloTabla > td').each(function (i, elem) {
        headerTable[i] = removeSpacesAndSpecialCharacters($(this).text())
      })

      // parse each row of the table to obj and adds it to items[]
      $('tr.textoTabla').each(function (index) {
        var current = $(this).children()
        var obj = {}

        headerTable.forEach((e, i) => {
          // id of each row
          if (id) {
            let href = current.find('a')[0].attribs.href
            obj['id'] = href.slice(href.lastIndexOf('=') + 1)
          }

          let attribute = headerTable[i]
          if (current[i].children[0].hasOwnProperty('children')) {
            obj[attribute] = current[i].children[0].children[0].data
          } else {
            obj[attribute] = current[i].children[0].data
          }
        })

        items.push(obj)
      })

      const fixedItems = fixNumbers(items) //parse possible numbers
      if (fixedItems.length === 0) {
        reject(new Error('No existe ninguna instancia para dicha consulta. Verifique los parametros.'))
      }
      resolve(fixedItems)
    })
  })
}
