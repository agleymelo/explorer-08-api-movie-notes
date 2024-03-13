const { Router } = require("express")

const usersRoutes = require("./user.router")
const movieRoutes = require("./movie-notes.router")
const sessionRoutes = require("./session.router")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/movies", movieRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes