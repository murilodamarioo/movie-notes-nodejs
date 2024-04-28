const { Router }  = require('express')

const usersRouter = require('./users.routes')
const movieNotesRouter = require('./movie_notes.routes')
const movieTagsRouter = require('./movie_tags.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/movienotes', movieNotesRouter)
routes.use('/movietags', movieTagsRouter)

module.exports = routes