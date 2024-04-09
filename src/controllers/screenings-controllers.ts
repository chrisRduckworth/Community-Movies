import { RequestHandler } from "express";
const {
  fetchScreenings,
  fetchScreeningDetails,
} = require("../models/screenings-models");

const getScreenings: RequestHandler = async (req, res, next) => {
  try {
    const screenings = await fetchScreenings();
    res.status(200).send({ screenings });
  } catch (e) {
    next(e);
  }
};

const getScreeningDetails: RequestHandler = async (req, res, next) => {
  try {
    const { screening_id } = req.params;
    const screening = await fetchScreeningDetails(screening_id);
    res.status(200).send({ screening });
  } catch (e) {
    next(e);
  }
};

module.exports = { getScreenings, getScreeningDetails };
