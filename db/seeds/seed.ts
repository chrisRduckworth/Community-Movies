const db = require("../connection");
const format = require("pg-format");

import { ScreeningSeed, BookingSeed } from "../data/interfaces";

const seed = async ({
  screeningData,
  bookingData,
}: {
  screeningData: ScreeningSeed[];
  bookingData: BookingSeed[];
}) => {
  // drop tables
  await db.query("DROP TABLE IF EXISTS bookings;");
  await db.query("DROP TABLE IF EXISTS screenings;");

  // create tables
  await db.query(`CREATE TABLE screenings (
    screening_id SERIAL PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR NOT NULL,
    cost INT NOT NULL,
    is_pay_what_you_want BOOLEAN DEFAULT FALSE NOT NULL,
    tmdb_id INT,
    title VARCHAR NOT NULL,
    year INT,
    poster_url VARCHAR DEFAULT 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg',
    backdrop_url VARCHAR,
    logo_url VARCHAR,
    description VARCHAR
  );`);

  await db.query(`CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    screening_id INT REFERENCES screenings(screening_id) NOT NULL,
    email VARCHAR(255) NOT NULL,
    charge INT NOT NULL
  );`);

  // insert screenings
  const insertScreeningsStr = format(
    `INSERT INTO screenings
      (date, location, cost, is_pay_what_you_want, tmdb_id, title, year, poster_url, backdrop_url, logo_url, description)
    VALUES %L;`,
    screeningData.map((screening) => {
      return [
        screening.date,
        screening.location,
        screening.cost,
        screening.is_pay_what_you_want,
        screening.tmdb_id,
        screening.title,
        screening.year,
        screening.poster_url,
        screening.backdrop_url,
        screening.logo_url,
        screening.description,
      ];
    })
  );
  await db.query(insertScreeningsStr);

  // insert bookings
  const insertBookingsStr = format(
    `INSERT INTO bookings 
      (screening_id, email, charge)
    VALUES %L`,
    bookingData.map((booking) => {
      return [booking.screening_id, booking.email, booking.charge];
    })
  );
  await db.query(insertBookingsStr);
};

module.exports = seed;
