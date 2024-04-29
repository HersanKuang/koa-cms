const KoaRouter = require('@koa/router')
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const { create, list } = require('../modules/menu/controller/menu.controller')
const baseServerError = require('../shared/middleware/base_error.middleware');

const menuRouter = new KoaRouter({ prefix: '/menu' })

// 新增菜单/菜单列表
menuRouter.post('/', verifyAuth, create)
menuRouter.post('/list', verifyAuth, list)

module.exports = menuRouter
