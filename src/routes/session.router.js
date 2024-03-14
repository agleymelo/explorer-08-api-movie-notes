const { Router } = require("express")

const SessionsController = require("../controllers/sessions-controller")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const sessionsController = new SessionsController()

const sessionRoutes = Router()

sessionRoutes.post("/", sessionsController.create)

module.exports = sessionRoutes
