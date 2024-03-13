const { compare } = require("bcryptjs")

const knex = require("../database/knex")
const AppError = require('../utils/app-error')
class SessionsController {

  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("E-mail or password incorrent", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail or password incorrent", 401)
    }



    return response.status(200).json({ user })
  }
}

module.exports = SessionsController