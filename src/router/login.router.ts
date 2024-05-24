import Router from '@koa/router'
import { verifyLogin } from '@/modules/login/middleware/login.middleware'
import { sign } from '@/modules/login/controller/login.controller'

const loginRouter = new Router({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)

export default loginRouter
