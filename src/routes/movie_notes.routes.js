const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesRoutes = new Router()

const movieNotesController = new MovieNotesController()

movieNotesRoutes.get('/:id', movieNotesController.show)

module.exports = movieNotesRoutes