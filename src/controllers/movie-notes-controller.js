const AppError = require("../utils/app-error")

const knex = require("../database/knex")

class MovieNotesController {

  async index(request, response) {
    const { user_id } = request.query

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    const movieNotes = await knex("movie-notes").where({ user_id })

    return response.status(200).json(movieNotes)
  }

  async create(request, response) {
    const { user_id } = request.params
    const { title, description, rating } = request.body

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("the rating must be between 1 and 5")
    }

    await knex("movie-notes").insert({
      title,
      description,
      rating,
      user_id,
    })

    return response.status(201).json()
  }
}

module.exports = MovieNotesController