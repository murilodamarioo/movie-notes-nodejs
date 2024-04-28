const { Router } = require('express')

const MovieTagsController = require('../controllers/MovieNotesController')

const movieTagsRoutes = new Router()

const movieTagsController = new MovieTagsController()

movieTagsRoutes.post('/', movieTagsController.create)

module.exports = movieTagsRoutes