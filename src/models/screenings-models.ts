import { ScreeningOverview, ScreeningDetail } from "../interfaces";
const db = require("../db/connection");
const dayjs = require("dayjs");

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

exports.createBooking = async (
  screening_id: string,
  email: any,
  charge: any
) => {
  const { rows } = await db.query(
    `
    INSERT INTO bookings
      (screening_id, email, charge)
    VALUES 
      ($1, $2, $3)
    RETURNING *;
    `,
    [screening_id, email, charge]
  );
  return rows[0];
};
