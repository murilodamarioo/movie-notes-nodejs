const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesController')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const movieNotesRoutes = new Router()

const movieNotesController = new MovieNotesController()

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.get('/', movieNotesController.index)
movieNotesRoutes.get('/:id', movieNotesController.show)
movieNotesRoutes.post('/', movieNotesController.create)

module.exports = movieNotesRoutes