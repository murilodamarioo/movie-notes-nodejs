const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesRoutes = new Router()

const movieNotesController = new MovieNotesController()

movieNotesRoutes.get('/', movieNotesController.index)
movieNotesRoutes.get('/:id', movieNotesController.show)
movieNotesRoutes.post('/:user_id', movieNotesController.create)

module.exports = movieNotesRoutes