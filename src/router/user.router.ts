import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import {
  create,
  update,
  remove,
  list,
  detail
} from '@/modules/user/controller/user.controller'
import {
  verifyUser,
  handlePassword,
  verifyNameExists,
  verifyUserExists
} from '@/modules/user/middleware/user.middleware'

const userRouter = new Router({ prefix: '/users' })

// 用户注册
userRouter.post('/', verifyUser, verifyNameExists, handlePassword, create)
// 编辑用户
userRouter.patch('/:id', verifyAuth, verifyUser, verifyUserExists, update)
// 删除用户
userRouter.delete('/:id', verifyAuth, verifyUserExists, remove)
// 用户列表
userRouter.post('/list', verifyAuth, list)
// 用户详情
userRouter.get('/:id', verifyAuth, detail)

export default userRouter
