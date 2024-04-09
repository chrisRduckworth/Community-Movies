import { RequestHandler } from "express";
const { fetchScreenings } = require("../models/screenings-models");

const getScreenings: RequestHandler = async (req, res, next) => {
  const screenings = await fetchScreenings();
  res.status(200).send({ screenings });
};

module.exports = { getScreenings };
