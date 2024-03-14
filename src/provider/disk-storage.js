const { rename, stat, unlink } = require("node:fs/promises")
const { resolve } = require("node:path")

const uploadConfig = require("../config/upload")

class DiskStorage {
  async saveFile(file) {
    await rename(
      resolve(uploadConfig.TMP_FOLDER, file),
      resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
  }

  async deleteFile(file) {
    const filePath = resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await stat(filePath)
    } catch (error) {
      return
    }

    await unlink(filePath)
  }
}

module.exports = DiskStorage