import jwt from 'jsonwebtoken'
import { UNAUTHORIZATION } from '../../config/error.constant'
import { PUBLIC_KEY } from '../../config/secret.config'

const verifyAuth = async (ctx: KoaCTX, next: KoaNext) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

export default verifyAuth
