const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class MovieNotesController {

    async show(request, response) {
        const { id } = request.params

        const movieNotes = await knex('movie_notes').where({ id }).first()
        console.log(movieNotes)

        return response.status(200).json({...movieNotes})
    }

    async create(request, response) {
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        const useExists = knex('users').where({id: user_id}).first()

        if (!useExists) throw new AppError('ID de usuário inexistente')

        if (rating > 5 || rating < 0 || typeof rating !== "number") throw new AppError('O valor do rating deve ser entre 0 e 5.')

        const [note_id] = await knex('movie_notes').insert({ title, description, rating, user_id })
        console.log(note_id)

        const movieTagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })
        console.log
        (
            `
            movie tags:
            ${JSON.stringify(movieTagsInsert)}
            `
        )
        await knex('movie_tags').insert(movieTagsInsert)

        return response.status(201).json()
    }

    
}

module.exports = MovieNotesController