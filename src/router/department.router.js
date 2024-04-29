const KoaRouter = require('@koa/router');
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const { create, remove, update, list } = require('../modules/department/controller/department.controller');
const baseServerError = require('../shared/middleware/base_error.middleware');

const departmentRouter = new KoaRouter({ prefix: '/department' });

// 新建部门
departmentRouter.post('/', verifyAuth, create);
// 编辑部门
departmentRouter.patch('/:id', verifyAuth, update);
// 删除部门
departmentRouter.delete('/:id', verifyAuth, remove)
// 部门列表
departmentRouter.post('/list', verifyAuth, list)

module.exports = departmentRouter;
