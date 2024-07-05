const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const { comapre } = require('bcryptjs')

const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body
    const { secret, expiresIn } = authConfig.jwt

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail e/ou senha inválido(s)', 401)
    }

    const passwrodMatched = await comapre(password, user.password)

    if (!passwrodMatched) {
      throw new AppError('E-mail e/ou senha inválido(s)', 401)
    }

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController