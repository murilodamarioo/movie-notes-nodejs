const fs = require('fs')
const path = require('path')
const uploadingConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadingConfig.TMP_FOLDER, file),
      path.resolve(uploadingConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadingConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return false
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage