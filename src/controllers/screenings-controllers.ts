import { RequestHandler } from "express";
const {
  fetchScreenings,
  fetchScreeningDetails,
  createCheckout,
  createBooking,
} = require("../models/screenings-models");
const stripeKey = process.env.STRIPE_KEY!;
const stripe = require("stripe")(stripeKey);
const endpointSecret = process.env.WEBHOOK_SECRET!;

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

const postCheckout: RequestHandler = async (req, res, next) => {
  try {
    const { screening_id } = req.params;
    const { charge } = req.body;
    const sessionUrl = await createCheckout(screening_id, charge);
    console.log(screening_id, charge, sessionUrl);
    res.redirect(303, sessionUrl);
  } catch (e) {
    next(e);
  }
};

const postBooking: RequestHandler = async (req, res, next) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    if (event.type === "checkout.session.completed") {
      // run model
      const {
        data: {
          object: {
            id,
            amount_total,
            customer_details: { email },
            metadata: { screening_id },
          },
        },
      } = event;
      const booking = await createBooking(
        id,
        screening_id,
        email,
        amount_total
      );
      res.status(201).send({ booking });
    }
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getScreenings,
  getScreeningDetails,
  postCheckout,
  postBooking,
};
