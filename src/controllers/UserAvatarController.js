const knex = require('knex')
const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFile = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users').where({ id: user_id }).first()

    if (!user) {
      throw new AppError('Somente usuários autenticados podem alterar o avatar', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFile)
    user.avatar = filename

    await knex('users').update({ avata: filename }).where({ id: user_id })

    return response.json(user)
  }
}

module.exports = UserAvatarController