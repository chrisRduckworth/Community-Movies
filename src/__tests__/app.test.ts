import { ScreeningDetail } from "../interfaces";

const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const dayjs = require("dayjs");
const server = require("./mocks/server");

let token = "";

beforeAll(async () => {
  const { body } = await request(app)
    .post("/api/staff/login")
    .send({ password: "test_password" })
    .set("Origin", "www.testdomain.com");
  token = body.token;
  return server.listen({
    onUnhandledRequest: "bypass",
  });
});
beforeEach(() => {
  server.resetHandlers();
  return seed(testData);
});
afterAll(() => {
  server.close();
  return db.end();
});

describe("GET /api", () => {
  it("should responds with a JSON object, each key is a valid path", async () => {
    const { body } = await request(app).get("/api").expect(200);

    Object.keys(body).forEach((key) => {
      expect(key).toMatch(/(GET|POST|PATCH|DELETE) \/api(\/:?[a-z_]*)*/g);
    });
  });

  it("should respond with an object where each value has is an object with the correct keys", async () => {
    const { body } = await request(app).get("/api").expect(200);

    Object.values(body).forEach((endpoint: any) => {
      expect(Object.keys(endpoint)).toHaveLength(4);
      expect(endpoint).toHaveProperty("description");
      expect(endpoint).toHaveProperty("queries");
      expect(endpoint).toHaveProperty("format");
      expect(endpoint).toHaveProperty("exampleResponse");
    });
  });

  it("should respond with the correct number of controllers", async () => {
    const { body } = await request(app).get("/api").expect(200);

    const controllers = ["api", "screenings", "staff", "films"];

    const controllerFunctions = controllers.map((str) =>
      require(`../controllers/${str}-controllers`)
    );

    const numOfEndpoints = controllerFunctions.reduce(
      (acc, curr) => acc + Object.keys(curr).length,
      0
    );

    expect(Object.keys(body)).toHaveLength(numOfEndpoints);
  });
});

describe("GET /api/screenings", () => {
  it("should return a list of screening objects", async () => {
    const {
      body: { screenings },
    } = await request(app).get("/api/screenings").expect(200);

    expect(screenings.length).toBeGreaterThan(0);

    screenings.forEach((screening: any) => {
      // screening properties
      expect(Object.keys(screening)).toHaveLength(5);
      expect(screening).toHaveProperty("film");
      expect(screening).toHaveProperty("location");
      expect(screening).toHaveProperty("date");
      expect(screening).toHaveProperty("cost");
      expect(screening).toHaveProperty("is_pay_what_you_want");

      // film properties
      expect(Object.keys(screening.film)).toHaveLength(3);
      expect(screening.film).toHaveProperty("title");
      expect(screening.film).toHaveProperty("year");
      expect(screening.film).toHaveProperty("poster_url");
    });
  });

  it("should format the date correctly", async () => {
    const {
      body: { screenings },
    } = await request(app).get("/api/screenings").expect(200);

    screenings.forEach(({ date }: { date: string }) => {
      expect(date).toEqual(dayjs(date).format());
    });
  });

  it("should return the screenings sorted by date ascending", async () => {
    const {
      body: { screenings },
    } = await request(app).get("/api/screenings").expect(200);

    const sortingFunction = (
      { date: a }: { date: string },
      { date: b }: { date: string }
    ): number => {
      return dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
    };

    expect(screenings).toEqual(screenings.toSorted(sortingFunction));
  });

  it("should return only screenings from the current date onwards", async () => {
    const now = dayjs();

    const {
      body: { screenings },
    } = await request(app).get("/api/screenings").expect(200);

    screenings.forEach(({ date }: { date: string }) => {
      expect(now.isBefore(dayjs(date))).toBe(true);
    });
  });
});

describe("GET /api/screenings/:screening_id", () => {
  it("should return the correct information", async () => {
    const expectedInfo: ScreeningDetail = {
      date: "2024-04-03T12:00:00.000Z",
      location: "123 Waterloo Road, London, L1 4HK",
      cost: 0,
      is_pay_what_you_want: true,
      film: {
        title: "Good Will Hunting",
        year: 1997,
        backdrop_url:
          "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/4ywKTlsIllvQYRiZJPwYACJIHY8.jpg",
        logo_url:
          "https://image.tmdb.org/t/p/original/357AN6S2UIfoJrt4DKPMDwwhWe2.png",
        description:
          "When professors discover that an aimless janitor is also a math genius, a therapist helps the young man confront the demons that are holding him back.",
      },
    };

    const {
      body: { screening },
    } = await request(app).get("/api/screenings/1").expect(200);

    expect(screening).toEqual(expectedInfo);
  });
  it("should return different information for different id", async () => {
    const {
      body: { screening: screening1 },
    } = await request(app).get("/api/screenings/1").expect(200);
    const {
      body: { screening: screening2 },
    } = await request(app).get("/api/screenings/2").expect(200);

    expect(screening1).not.toEqual(screening2);
  });
  it("should return 404 if no screening is found with the id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/screenings/10000").expect(404);

    expect(msg).toBe("Screening not found");
  });
  it("should return 400 if sent incorrect data type for id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/screenings/bananas").expect(400);

    expect(msg).toBe("Bad request");
  });
});

describe("POST /api/screenings/:screening_id/checkout", () => {
  it("should redirect to a checkout screen", async () => {
    const body = {
      charge: 1500,
    };

    await request(app)
      .post("/api/screenings/2/checkout")
      .send(body)
      .set("Origin", "www.testdomain.com")
      .expect(303)
      .expect("Location", /https:\/\/checkout\.stripe\.com\/c\/pay\/.*/);
  });
  it("should redirecto to a checkout screen when paying what you want", async () => {
    const body = {
      charge: 800,
    };

    await request(app)
      .post("/api/screenings/1/checkout")
      .send(body)
      .set("Origin", "www.testdomain.com")
      .expect(303)
      .expect("Location", /https:\/\/checkout\.stripe\.com\/c\/pay\/.*/);
  });
  it("should respond with 403 if send from an invalid origin", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/2/checkout")
      .send({ charge: 1500 })
      .set("Origin", "www.random.com")
      .expect(403);
    expect(msg).toBe("CORS authentication failed");
  });
  it("should return 404 if no screening with the id is found", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/1000/checkout")
      .send({ charge: 1500 })
      .set("Origin", "www.testdomain.com")
      .expect(404);
    expect(msg).toBe("Screening not found");
  });
  it("should return 400 if invalid screening id is given", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/bananas/checkout")
      .send({ charge: 1500 })
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Bad request");
  });
  it("should return 400 if charge is not equal to cost of paid screening", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/2/checkout")
      .send({ charge: 100 })
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Invalid charge");
  });
  it("should return 400 if paying for free screening", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/3/checkout")
      .send({ charge: 100 })
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Invalid charge");
  });
  it("should return 400 if given invalid data type for charge", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/2/checkout")
      .send({ charge: "bananas" })
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Invalid charge");
  });
  it("should return 400 if give no charge value", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/2/checkout")
      .send({})
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Invalid charge");
  });
  it("should return 400 if paying less than minimum stripe charge (30p)", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings/1/checkout")
      .send({ charge: 1 })
      .set("Origin", "www.testdomain.com")
      .expect(400);

    expect(msg).toBe("Bad request");
  });
});

describe("POST /api/staff/login", () => {
  it("should respond with 201 and a JWT when successfully logged in", async () => {
    const {
      body: { msg, token },
    } = await request(app)
      .post("/api/staff/login")
      .send({ password: "test_password" })
      .set("Origin", "www.testdomain.com")
      .expect(201);
    expect(msg).toBe("Login successful");
    expect(typeof token).toBe("string");
  });
  it("should respond with 403 if not coming from a valid url", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/staff/login")
      .send({ password: "test_password" })
      .set("Origin", "www.random.com")
      .expect(403);
    expect(msg).toBe("CORS authentication failed");
  });
  it("should respond with 400 failed login if given incorrect password", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/staff/login")
      .send({ password: "invalid" })
      .set("Origin", "www.testdomain.com")
      .expect(400);
    expect(msg).toBe("Password does not match");
  });
  it("should respond with 400 bad request if given invalid body", async () => {
    const {
      body: { msg },
    } = await request(app)
      .post("/api/staff/login")
      .send({ psswrd: "invalid" })
      .set("Origin", "www.testdomain.com")
      .expect(400);
    expect(msg).toBe("Invalid body");
  });
});

describe("GET /api/films", () => {
  it("returns a list of films", async () => {
    const {
      body: { films },
    } = await request(app)
      .get("/api/films?title=good")
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    films.forEach((film: any) => {
      expect(film).toHaveProperty("tmdb_id");
      expect(typeof film.tmdb_id).toBe("number");
      expect(film).toHaveProperty("title");
      expect(typeof film.title).toBe("string");
      expect(film).toHaveProperty("year");
      expect(typeof film.year).toBe("number");
      expect(film).toHaveProperty("poster_url");
      expect(typeof film.poster_url).toBe("string");
    });
  });
  it("should respond with 403 if not coming from a valid url", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/films?title=good")
      .set("Origin", "www.random.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
    expect(msg).toBe("CORS authentication failed");
  });
  it("should respond with 401 if invalid jwt is given", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/films?title=good")
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer 12345`)
      .expect(401);
    expect(msg).toBe("Authorization failed");
  });
  it("should respond with 400 if given inalid query", async () => {
    const {
      body: { msg },
    } = await request(app)
      .get("/api/films?bananas=yellow")
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(msg).toBe("Invalid search term");
  });
});

describe.only("POST /api/screenings", () => {
  it("should respond with the screening", async () => {
    const screening = {
      tmdb_id: 489,
      location: "123 Waterloo Road, London, A1 9PB",
      date: "2024-05-07 17:00:00+01",
      cost: 0,
      is_pay_what_you_want: true,
    };
    const {
      body: {
        screening_id,
        location,
        date,
        cost,
        is_pay_what_you_want,
        film: { tmdb_id, title, year, poster_url, backdrop_url, description },
      },
    } = await request(app)
      .post("/api/screenings")
      .send(screening)
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(typeof screening_id).toBe("number");
    expect(location).toBe("123 Waterloo Road, London, A1 9PB");
    expect(date).toBe("2024-05-07T16:00:00.000Z");
    expect(cost).toBe(0);
    expect(is_pay_what_you_want).toBe(true);
    expect(tmdb_id).toBe(489);
    expect(title).toBe("Good Will Hunting");
    expect(year).toBe(1997);
    expect(poster_url).toBe(
      "https://image.tmdb.org/t/p/original/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg"
    );
    expect(backdrop_url).toBe(
      "https://image.tmdb.org/t/p/original/55NKVbGDqqsu5tlVmnKksrX7Wtw.jpg"
    );
    expect(description).toBe(
      "When professors discover that an aimless janitor is also a math genius, a therapist helps the young man confront the demons that are holding him back."
    );
  });
  it("should add the screening to the database", async () => {
    const {
      rows: [{ count }],
    } = await db.query("SELECT COUNT(screening_id) FROM screenings;");

    const screening = {
      tmdb_id: 489,
      location: "123 Waterloo Road, London, A1 9PB",
      date: "2024-05-07 17:00:00+01",
      cost: 0,
      is_pay_what_you_want: true,
    };

    await request(app)
      .post("/api/screenings")
      .send(screening)
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    const {
      rows: [{ count: newCount }],
    } = await db.query("SELECT COUNT(screening_id) FROM screenings;");

    expect(parseInt(newCount)).toBe(parseInt(count) + 1);
  });
  it("should respond with 403 if not coming from a valid url", async () => {
    const screening = {
      tmdb_id: 489,
      location: "123 Waterloo Road, London, A1 9PB",
      date: "2024-05-07 17:00:00+01",
      cost: 0,
      is_pay_what_you_want: true,
    };

    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings")
      .send(screening)
      .set("Origin", "www.random.com")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);
    expect(msg).toBe("CORS authentication failed");
  });
  it("should respond with 401 if invalid jwt is given", async () => {
    const screening = {
      tmdb_id: 489,
      location: "123 Waterloo Road, London, A1 9PB",
      date: "2024-05-07 17:00:00+01",
      cost: 0,
      is_pay_what_you_want: true,
    };

    const {
      body: { msg },
    } = await request(app)
      .post("/api/screenings")
      .send(screening)
      .set("Origin", "www.testdomain.com")
      .set("Authorization", `Bearer 12345`)
      .expect(401);
    expect(msg).toBe("Authorization failed");
  });
  // tmdb_id not found
  // date formats
  // missing fields
  // invalid data types
  // non-zero cost and is pay what you want
  // tmdb errors
});
