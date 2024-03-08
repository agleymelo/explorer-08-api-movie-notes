const { hash, compare } = require('bcryptjs')

const knex = require('../database/knex')
const AppError = require('../utils/app-error')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userAlreadyExists = await knex('users').where({ email }).first()

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const { user_id } = request.params
    const { name, email, old_password, password } = request.body

    const [user] = await knex('users').where({ id: user_id })

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithUpdatedEmail = await knex('users').where({ email }).first()

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already in use')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError('You need to enter the old password to set a new password')
    }

    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password)

      if (!checkPassword) {
        throw new AppError('The old password does not match')
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    return response.status(200).json()
  }
}

module.exports = UsersController
