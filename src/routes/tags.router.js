const { Router } = require("Router")

const MovieTagsController = require("../controllers/movie-tags-controller")
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const movieTagsController = new MovieTagsController()
const movieTagsRoutes = new Router()

movieTagsRoutes.use(ensureAuthenticated)

movieTagsRoutes.index("/", movieTagsController.index)

module.exports = movieTagsRoutes