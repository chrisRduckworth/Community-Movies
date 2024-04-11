import { Request, Response, NextFunction } from "express";
const { getEndpoints } = require("./controllers/api-controllers");
const {
  getScreenings,
  getScreeningDetails,
  postBooking,
} = require("./controllers/screenings-controllers");

const express = require("express");
const cors = require("cors");
const corsOptions = require("./cors_config");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/screenings", getScreenings);

app.get("/api/screenings/:screening_id", getScreeningDetails);

// these endpoints must come from an allowed origin
app.use(cors(corsOptions));

app.post("/api/screenings/:screening_id", postBooking);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const badReqCodes = ["22P02"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
