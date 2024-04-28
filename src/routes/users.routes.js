const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.get('/:id', usersController.show)
usersRoutes.post('/', usersController.create)


module.exports = usersRoutes