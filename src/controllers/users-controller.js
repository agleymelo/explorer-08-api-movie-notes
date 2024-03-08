const knex = require("../database/knex")

class UsersControllers {

  async create(request, response) {
    const { name, email, password } = request.body

    const userAlreadyExists = await knex("users").where({ email }).first()

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    await knex("users").insert({
      name,
      email,
      password
    })

    return response.status(201).json()
  }
}

module.exports = UsersControllers