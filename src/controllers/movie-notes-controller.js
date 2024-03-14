const AppError = require("../utils/app-error")

const knex = require("../database/knex")

class MovieNotesController {

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    let notes

    if (tags) {
      const filtredTags = tags.split(",").map(tag => tag.trim())

      notes = await knex("movie-tags")
        .select([
          "movie-notes.id",
          "movie-notes.title",
          "movie-notes.user_id"
        ])
        .where("movie-notes.user_id", user_id)
        .whereLike("movie-notes.title", `%${title}%`)
        .whereIn("name", filtredTags)
        .innerJoin("movie-notes", "movie-notes.id", "movie-tags.note_id")
        .orderBy("movie-tags.title")
    } else {
      notes = await knex("movie-notes").where({ user_id }).orderBy("title")
    }

    const movieTags = await knex("movie-tags").where({ user_id })

    const notedWithTags = movieTags.map(node => {
      const noteTag = movieTags.filter(tag => tag.note_id === node.id)

      return {
        ...notes,
        tags: noteTag
      }
    })

    return response.status(200).json(notedWithTags)
  }

  async show(request, response) {
    const user_id = request.user.id
    const { id } = request.params

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    const movieNote = await knex("movie-notes").where({ id }).first()

    if (!movieNote) {
      throw new AppError("Movie Note not found")
    }

    const tags = await knex("movie-tags").where({ note_id: id }).orderBy("name")

    return response.status(200).json({
      ...movieNote,
      tags
    })
  }

  async create(request, response) {
    const user_id = request.user.id
    const { title, description, rating, tags } = request.body

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("the rating must be between 1 and 5")
    }

    const [note_id] = await knex("movie-notes").insert({
      title,
      description,
      rating,
      user_id,
    })

    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id
      }
    })

    await knex("movie-tags").insert(tagsInsert)

    return response.status(201).json()
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { id } = request.params

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found")
    }

    const movieNote = await knex("movie-notes").where({ id }).first()

    if (!movieNote) {
      throw new AppError("Movie note not found")
    }

    await knex("movie-notes").where({ id }).del()

    return response.status(204).json()
  }
}

module.exports = MovieNotesController