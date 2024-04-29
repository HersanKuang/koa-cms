const jwt = require('jsonwebtoken')
const { UNAUTHORIZATION } = require('@/config/error.constant')
const { PUBLIC_KEY } = require('@/config/screct.config')

const verifyAuth = async (ctx, next) => {
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
  } catch(error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = verifyAuth
