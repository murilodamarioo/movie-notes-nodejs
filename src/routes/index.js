const { Router }  = require('express')

const usersRouter = require('./users.routes')
const movieNotesRouter = require('./movie_notes.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/movienotes', movieNotesRouter)

module.exports = routes