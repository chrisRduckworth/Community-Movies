import { RequestHandler } from "express";
const { fetchScreenings } = require("../models/screenings-models");

const getScreenings: RequestHandler = async (req, res, next) => {
  try {
    const screenings = await fetchScreenings();
    res.status(200).send({ screenings });
  } catch (e) {
    next(e);
  }
};

module.exports = { getScreenings };
