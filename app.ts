import { Request, Response, NextFunction } from "express";
const { getEndpoints } = require("./controllers/api-controllers");
const { getScreenings } = require("./controllers/screenings-controllers");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api", getEndpoints);

app.get("/api/screenings", getScreenings);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
