const devData = require("../data/development-data/index")
const seed = require("./seed")
const db = require("../connection")

const runSeed = async () => {
  await seed(devData)
  return db.end()
}

runSeed();
