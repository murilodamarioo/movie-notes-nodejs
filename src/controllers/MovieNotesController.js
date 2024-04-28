const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class MovieNotesController {

    async show(request, response) {
        
    }

    async create(request, response) {
        const { title, description, rating } = request.body
        const { user_id } = request.params

        const useExists = knex('users').where({id: user_id}).first()

        if (!useExists) throw new AppError('ID de usuário inexistente')

        if (rating > 5 || rating < 0) throw new AppError('O valor do rating deve ser entre 0 e 5.')

        const movieNote = await knex('movie_notes').insert({ title, description, rating, user_id })
        console.log(movieNote)

        return response.status(201).json()
    }
}

module.exports = MovieNotesController