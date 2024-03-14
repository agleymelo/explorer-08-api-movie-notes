const { resolve } = require("node:path")
const { randomBytes } = require("node:crypto")
const multer = require("multer")

const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = resolve(TMP_FOLDER, "uploads")

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}