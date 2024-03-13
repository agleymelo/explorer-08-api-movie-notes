const { verify } = require("jsonwebtoken")

const AppError = require("../utils/app-error")
const authConfig = require("../config/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT token not provided", 401)
  }

  const [_, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

    return next()
  } catch (error) {
    throw new AppError("JWT Token invalid", 401)
  }
}

module.exports = ensureAuthenticated