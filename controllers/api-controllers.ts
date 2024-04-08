import { RequestHandler } from "express"
const { fetchEndpoints } = require("../models/api-models")

const getEndpoints: RequestHandler = (req, res, next) => {
  try {
    const endpoints = fetchEndpoints()
    res.status(200).send(endpoints)
  } catch (e) {
    next(e)
  }
}

module.exports = { getEndpoints }
