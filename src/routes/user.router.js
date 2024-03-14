const { Router } = require("express")

const UsersController = require("../controllers/users-controller")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes