const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('@/config/path.contant')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, UPLOAD_PATH)
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
})

const handleAvatar = upload.single('avatar')

module.exports = {
  handleAvatar
}
