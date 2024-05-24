import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import {
  create,
  update,
  remove,
  list
} from '@/modules/department/controller/department.controller'

const departmentRouter = new Router({ prefix: '/department' })

// 新建部门
departmentRouter.post('/', verifyAuth, create)
// 编辑部门
departmentRouter.patch('/:id', verifyAuth, update)
// 删除部门
departmentRouter.delete('/:id', verifyAuth, remove)
// 部门列表
departmentRouter.post('/list', verifyAuth, list)

export default departmentRouter
