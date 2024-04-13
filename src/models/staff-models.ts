const jwt = require("jsonwebtoken")

exports.attemptLogin = async (password: string) => {
  const admin_pass = process.env.ADMIN_PASSWORD
  const privateToken = process.env.TOKEN

  if (!password) {
    throw {
      status:400,
      msg: "Invalid body"
    }
  }

  if (password !== admin_pass) {
    throw {
      status: 400,
      msg: "Password does not match"
    }
  }

  const token = await jwt.sign({user: "admin"}, privateToken)

  return token
}
