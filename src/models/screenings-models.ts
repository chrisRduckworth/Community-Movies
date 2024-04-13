import { ScreeningOverview, ScreeningDetail } from "../interfaces";
const db = require("../db/connection");
const dayjs = require("dayjs");
const stripeKey = process.env.STRIPE_KEY!;
const frontendDomain = process.env.FRONTEND_DOMAIN!;
const stripe = require("stripe")(stripeKey);

exports.fetchScreenings = async (): Promise<ScreeningOverview[]> => {
  const { rows }: any = await db.query(`
  SELECT 
    title,
    year,
    poster_url,
    location,
    date,
    cost,
    is_pay_what_you_want
  FROM screenings
  WHERE date >= CURRENT_TIMESTAMP
  ORDER BY date ASC;`);
  const screenings: ScreeningOverview[] = rows.map((screening: any) => {
    const {
      title,
      year,
      poster_url,
      location,
      date,
      cost,
      is_pay_what_you_want,
    } = screening;
    return {
      film: {
        title,
        year,
        poster_url,
      },
      location,
      date: dayjs(date).format(),
      cost,
      is_pay_what_you_want,
    };
  });
  return screenings;
};

exports.fetchScreeningDetails = async (
  screening_id: string
): Promise<ScreeningDetail> => {
  const { rows } = await db.query(
    `
    SELECT 
      date,
      location,
      cost,
      is_pay_what_you_want,
      title,
      year,
      backdrop_url,
      logo_url,
      description
    FROM screenings
    WHERE screening_id = $1;
    `,
    [screening_id]
  );

  if (rows.length === 0) {
    throw {
      status: 404,
      msg: "Screening not found",
    };
  }

  const {
    title,
    year,
    backdrop_url,
    logo_url,
    description,
    date,
    location,
    cost,
    is_pay_what_you_want,
  } = rows[0];

  const screening = {
    film: {
      title,
      year,
      backdrop_url,
      logo_url,
      description,
    },
    date,
    location,
    cost,
    is_pay_what_you_want,
  };

  return screening;
};

exports.createCheckout = async (screening_id: string, charge: any) => {
  const { rows } = await db.query(
    `
    SELECT 
      title, 
      cost, 
      is_pay_what_you_want 
    FROM screenings
    WHERE screening_id = $1;
`,
    [screening_id]
  );

  if (rows.length === 0) {
    throw {
      status: 404,
      msg: "Screening not found",
    };
  }

  const { title, cost, is_pay_what_you_want } = rows[0];

  if (!is_pay_what_you_want && cost !== charge) {
    throw {
      status: 400,
      msg: "Invalid charge",
    };
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "GBP",
          product_data: {
            name: `Ticket ${title}`,
          },
          unit_amount: charge,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${frontendDomain}screenings/${screening_id}/book/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${frontendDomain}screenings/${screening_id}`,
    metadata: {
      screening_id,
    },
  });

  return session.url;
};

exports.createBooking = async (
  booking_id: string,
  screening_id: string,
  email: string,
  charge: number
) => {
  const { rows } = await db.query(
    `
    INSERT INTO bookings
      (booking_id, screening_id, email, charge)
    VALUES 
      ($1, $2, $3, $4)
    RETURNING *;
    `,
    [booking_id, screening_id, email, charge]
  );
  return rows[0];
};
