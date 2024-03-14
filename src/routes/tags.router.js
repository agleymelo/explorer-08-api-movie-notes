const { Router } = require("express")

const MovieTagsController = require("../controllers/movie-tags-controller")
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const movieTagsRoutes = Router()
const movieTagsController = new MovieTagsController()

movieTagsRoutes.use(ensureAuthenticated)

movieTagsRoutes.get("/", movieTagsController.index)

module.exports = movieTagsRoutes