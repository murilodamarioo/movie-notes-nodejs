const { hash, compare } = require("bcryptjs")

const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class UsersController {

    async show(request, response) {
        const { id } = request.params

        // First check if user exists
        const [checkUserExists] = await knex('users').select(['id']).where('id', id)
        console.log(checkUserExists)

        if (!checkUserExists) throw new AppError('Usuário encontrado!')

        const { name, email } = await knex('users').where('id', id).first()

        return response.json({ name, email })
    }

    async create(request, response) {
        // First extract some infos from request body
        const { name, email, password } = request.body
        
        const [checkUserExists] = await knex('users').select(['email']).where('email', email)
        console.log(checkUserExists)

        if (checkUserExists) throw new AppError('Este e-mail já está cadastrado')

        console.log(checkUserExists)

        const hashPassword = await hash(password, 8)

        await knex('users').insert({
            name,
            email,
            password: hashPassword
        })

        response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id
        
        const [user] = await knex('users').where('id', user_id)
        console.log(user)

        if (!user) throw new AppError('Usuário não encontrado!')

        const [userWithUpdatedEmail] = await knex('users').select(['email']).where('email', email)

        if (userWithUpdatedEmail) throw new AppError('Este email já está em uso.')

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password && !old_password) throw new AppError('É necessário informar a senha antiga')

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)
            
            if (!checkOldPassword) throw new AppError('Senha antiga inválida.')

            user.password = await hash(password, 8)
        }

        await knex('users').update({name, email, password: user.password, updated_at: knex.raw('DATETIME(\'now\')')}).where('id', user_id)

        return response.status(200).json()
    }
}

module.exports = UsersController