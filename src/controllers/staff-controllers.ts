import { RequestHandler } from "express";
const { attemptLogin } = require("../models/staff-models")

const postLogin: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body
    const token = await attemptLogin(password)
    res.status(201).send({ token, msg: "Login successful"})
  } catch (e) {
    next(e)
  }
}

module.exports = { postLogin }
