import { ScreeningDetail } from "../interfaces";

const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const dayjs = require("dayjs");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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

    const controllers = ["api", "screenings"];

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

describe.only("GET /api/screenings/:screening_id", () => {
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
