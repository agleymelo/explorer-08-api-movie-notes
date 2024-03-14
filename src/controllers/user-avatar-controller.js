const knex = require("../database/knex")
const AppError = require("../utils/app-error")

const DiskStorage = require("../provider/disk-storage")

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("User not found", 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFileName)
    user.avatar = filename

    await knex("users").update(user).where({ id: user_id })

    return response.status(200).json(user)
  }
}

module.exports = UserAvatarController