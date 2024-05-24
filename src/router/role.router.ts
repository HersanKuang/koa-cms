import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import {
  create,
  remove,
  update,
  list,
  assignMenu,
  userMenu
} from '@/modules/role/controller/role.controller'

const roleRouter = new Router({ prefix: '/role' })

// 增删改查
roleRouter.post('/', verifyAuth, create)
roleRouter.delete('/:roleId', verifyAuth, remove)
roleRouter.patch('/:roleId', verifyAuth, update)
roleRouter.post('/list', verifyAuth, list)
// 给角色分配权限
roleRouter.post('/:roleId/menu', verifyAuth, assignMenu)
// 获取当前角色的菜单
roleRouter.get('/:roleId/menu', verifyAuth, userMenu)

export default roleRouter
