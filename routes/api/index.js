'use strict'

const router = require('express').Router()

router.get("/", (req, res, next) => {
  res.status(200).send({message: "Hello API"})
})


module.exports = router