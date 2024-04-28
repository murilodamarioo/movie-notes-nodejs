const { hash, compare } = require("bcryptjs")

const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class UsersController {

    async create(request, response) {
        // First extract some infos from request body
        const { name, email, password } = request.body
        
        const [checkUserExists] = await knex('users').select(['email']).where('email', email)
        console.log(checkUserExists)

        if (checkUserExists) {
            throw new AppError('Este e-mail já está cadastrado')
        }
        console.log(checkUserExists)

        const hashPassword = await hash(password, 8)

        await knex('users').insert({
            name,
            email,
            password: hashPassword
        })

        response.status(201).json()
    }
}

module.exports = UsersController