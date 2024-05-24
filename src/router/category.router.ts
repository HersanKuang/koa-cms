import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import { create, list } from '@/modules/category/controller/category.controller'

const categoryRouter = new Router({ prefix: '/category' })

// 新建类别
categoryRouter.post('/create', verifyAuth, create)
// 分类列表
categoryRouter.post('/list', verifyAuth, list)

export default categoryRouter
