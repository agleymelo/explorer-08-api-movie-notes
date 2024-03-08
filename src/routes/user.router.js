const { Router } = require("express")

const UsersController = require("../controllers/users-controller")

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:user_id", usersController.update)

module.exports = usersRoutes