const KoaRouter = require('@koa/router')
const { verifyLogin } = require('../modules/login/middleware/login.middleware')
const { sign } = require('../modules/login/controller/login.controller')
const baseServerError = require('../shared/middleware/base_error.middleware');

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)

module.exports = loginRouter
