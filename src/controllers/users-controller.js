const knex = require("../database/knex")
const AppError = require("../utils/app-error")

class UsersController {

  async create(request, response) {
    const { name, email, password } = request.body

    const userAlreadyExists = await knex("users").where({ email }).first()

    if (userAlreadyExists) {
      throw new AppError("User already exists")
    }

    await knex("users").insert({
      name,
      email,
      password
    })

    return response.status(201).json()
  }
}

module.exports = UsersController