import { RequestHandler } from "express";
const { fetchFilms } = require("../models/films-models");

const getFilms: RequestHandler = async (req, res, next) => {
  try {
    const { title } = req.query;
    const films = await fetchFilms(title);
    res.status(200).send({ films });
  } catch (e) {
    next(e);
  }
};

module.exports = { getFilms };
