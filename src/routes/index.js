const { Router } = require("express")
const usersRoutes = require("./user.router")

const routes = Router()

routes.use("/users", usersRoutes)

module.exports = routes