const knex = require("../database/knex")
const AppError = require('../utils/app-error')
class SessionsController {

  async create(request, response) {
    const { email, password } = request.body

    return response.status(200).json({ email, password })
  }
}

module.exports = SessionsController