import { RequestHandler } from "express";
const jwt = require("jsonwebtoken");

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    await jwt.verify(token, process.env.TOKEN);
    next();
  } catch (e) {
    res.status(401).send({ msg: "Authorization failed" });
  }
};

module.exports = { auth };
