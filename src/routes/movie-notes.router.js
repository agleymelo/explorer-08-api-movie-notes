const { Router } = require("express")

const MovieNotesController = require("../controllers/movie-notes-controller")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const movieNotesRoutes = Router()
const movieNotesController = new MovieNotesController()

movieNotesRoutes.use(ensureAuthenticated)
movieNotesRoutes.get("/", movieNotesController.index)
movieNotesRoutes.get("/:id", movieNotesController.show)
movieNotesRoutes.post("/", movieNotesController.create)
movieNotesRoutes.delete("/:id", movieNotesController.delete)

module.exports = movieNotesRoutes