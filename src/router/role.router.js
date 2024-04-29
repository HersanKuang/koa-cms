const KoaRouter = require('@koa/router')
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const { create, remove, update, list, assignMenu, userMenu } = require('../modules/role/controller/role.controller')
const baseServerError = require('../shared/middleware/base_error.middleware');

const roleRouter = new KoaRouter({ prefix: '/role' })

// 增删改查
roleRouter.post('/', verifyAuth, create)
roleRouter.delete('/:roleId', verifyAuth, remove)
roleRouter.patch('/:roleId', verifyAuth, update)
roleRouter.post('/list', verifyAuth, list)

// 给角色分配权限
roleRouter.post('/:roleId/menu', verifyAuth, assignMenu)
// 获取当前角色的菜单
roleRouter.get('/:roleId/menu', verifyAuth, userMenu)

module.exports = roleRouter
