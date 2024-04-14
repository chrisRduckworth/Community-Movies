import { Request, Response, NextFunction } from "express";
const { getEndpoints } = require("./controllers/api-controllers");
const {
  getScreenings,
  getScreeningDetails,
  postCheckout,
  postBooking,
  postScreening
} = require("./controllers/screenings-controllers");
const { postLogin } = require("./controllers/staff-controllers");
const { getFilms } = require("./controllers/films-controllers");

const express = require("express");
const cors = require("cors");
const corsOptions = require("./cors_config");
const { auth } = require("./middleware");

const app = express();

app.use(cors());

app.get("/api", getEndpoints);

app.get("/api/screenings", getScreenings);

app.get("/api/screenings/:screening_id", getScreeningDetails);

app.post(
  "/api/bookings",
  express.raw({ type: "application/json" }),
  postBooking
);

app.use(express.json());

// these endpoints must come from an allowed origin
app.use(cors(corsOptions));

app.post("/api/screenings/:screening_id/checkout", postCheckout);

app.post("/api/staff/login", postLogin);

// these endpoints require JWT authorization
app.use(auth);

app.get("/api/films", getFilms);

app.post("/api/screenings", postScreening)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const badReqCodes = ["22P02", "amount_too_small"];
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
