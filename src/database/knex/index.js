const config = require('../../../knexfile')
const knex = require('knex')

const connection = kenx(config.development)

module.exports = connection