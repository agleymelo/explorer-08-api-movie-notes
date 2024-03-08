
const AppError = require("../utils/app-error")
const knex = require("../database/knex")

class MovieTagsController {

  async create(request, response) {
    const { user_id } = request.params
  }
}

module.exports = MovieTagsController