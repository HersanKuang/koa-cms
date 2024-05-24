import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import { create, list } from '@/modules/menu/controller/menu.controller'

const menuRouter = new Router({ prefix: '/menu' })

// 新增菜单/菜单列表
menuRouter.post('/', verifyAuth, create)
menuRouter.post('/list', verifyAuth, list)

export default menuRouter
