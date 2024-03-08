const { Router } = require("express")
const usersRoutes = require("./user.router")
const movieRoutes = require("./movie-notes.router")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/movies", movieRoutes)

module.exports = routes