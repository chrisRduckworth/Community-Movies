import { ScreeningOverview } from "../interfaces";
const db = require("../db/connection");
const dayjs = require("dayjs");

exports.fetchScreenings = async () => {
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
