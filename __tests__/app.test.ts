const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")
const db = require("../db/connection")
const request = require("supertest")
const app = require("../app")

beforeEach(() => seed(testData));
afterAll(() => db.end())

describe("GET /api", () => {

  it("should responds with a JSON object, each key is a valid path", async () => {
    const { body } = await request(app)
      .get("/api")
      .expect(200)

    Object.keys(body).forEach((key) => {
      expect(key).toMatch(/(GET|POST|PATCH|DELETE) \/api(\/:?[a-z_]*)*/g)
    })
  })

  it("should respond with an object where each value has is an object with the correct keys", async () => {
    const { body } = await request(app)
      .get("/api")
      .expect(200)

    Object.values(body).forEach((endpoint: any) => {
      expect(Object.keys(endpoint)).toHaveLength(4)
      expect(endpoint).toHaveProperty("description")
      expect(endpoint).toHaveProperty("queries")
      expect(endpoint).toHaveProperty("format")
      expect(endpoint).toHaveProperty("exampleResponse")
    })
  })

  it("should respond with the correct number of controllers", async () => {
    const { body } = await request(app)
      .get("/api")
      .expect(200)

    const controllers = [
      "api"
    ]

    const controllerFunctions = controllers.map((str) => 
      require(`../controllers/${str}-controllers`)
    )

    const numOfEndpoints = controllerFunctions.reduce(
      (acc, curr) => acc + Object.keys(curr).length,
      0
    )

    expect(Object.keys(body)).toHaveLength(numOfEndpoints)
  })
})
