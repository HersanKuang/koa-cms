const KoaRouter = require('@koa/router');
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const baseServerError = require('../shared/middleware/base_error.middleware')
const { list, create } = require('../modules/category/controller/category.controller');

const categoryRouter = new KoaRouter({ prefix: '/category' });

// 新建类别
categoryRouter.post('/create', verifyAuth, create)
// 分类列表
categoryRouter.post('/list', verifyAuth, list)

module.exports = categoryRouter;