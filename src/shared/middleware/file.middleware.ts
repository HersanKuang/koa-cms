import multer from '@koa/multer'
import { UPLOAD_PATH } from '../../config/path.constant'

const upload = multer({
  storage: multer.diskStorage({
    destination(
      _req: any,
      _file: any,
      cb: (error: Error | null, destination: string) => void
    ) {
      cb(null, UPLOAD_PATH)
    },
    filename(
      _req: any,
      file: any,
      cb: (error: Error | null, filename: string) => void
    ) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
})

const handleAvatar = upload.single('avatar')

export { handleAvatar }
