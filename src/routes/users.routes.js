const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.get('/:id', usersController.show)
usersRoutes.post('/', usersController.create)


module.exports = usersRoutes