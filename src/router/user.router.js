const KoaRouter = require('@koa/router')
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const {
  create,
  update,
  remove,
  list,
  detail
} = require('../modules/user/controller/user.controller')
const {
  verifyUser,
  handlePassword,
  verifyNameExists,
  verifyUserExists
} = require('../modules/user/middleware/user.middleware')
const baseServerError = require('../shared/middleware/base_error.middleware');

const userRouter = new KoaRouter({ prefix: '/users' })

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

module.exports = userRouter
