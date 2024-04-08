const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")
const db = require("../db/connection")
const request = require("supertest")
const app = require("../app")

beforeEach(() => seed(testData));
afterAll(() => db.end())

describe("", () => {
  test("", () => {

  })
})
