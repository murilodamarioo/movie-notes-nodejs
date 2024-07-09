const AppError = require('../utils/AppError')

const knex = require('../database/knex')

class MovieNotesController {

    async index(request, response) {
        const user_id = request.user.id
        const {title, tags} = request.query

        let movieNotes

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim())
            console.log(filterTags)

            movieNotes = await knex('movie_tags')
                .select([
                    'movie_notes.id',
                    'movie_notes.title',
                    'movie_notes.user_id'
                ])
                .where('movie_notes.user_id', user_id)
                .whereLike('movie_notes.title', `%${title}%`)
                .whereIn('name', filterTags)
                .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
                .orderBy('title')
        } else {
            movieNotes = await knex('movie_notes').where({ user_id }).whereLike('title', `%${title}%`).orderBy('title')
        }

        const userTags = await knex('movie_tags').where({ user_id })
        const movieNotesWithTags = movieNotes.map(movieNote => {
            const movieNoteTags = userTags.filter(tag => tag.note_id === movieNote.id)

            return {
                ...movieNotes,
                tags: movieNoteTags
            }
        })

        return response.status(200).json({ movieNotesWithTags })
    }

    async show(request, response) {
        const user_id = request.user.id

        console.log(user_id)

        const movieNotes = await knex('movie_notes').where({user_id}).first()
        console.log(movieNotes)

        return response.status(200).json({...movieNotes})
    }

    async create(request, response) {
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

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