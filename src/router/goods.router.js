const KoaRouter = require('@koa/router');
const verifyAuth = require('@/shared/middleware/verify_auth.middleware')
const {
  list,
  getCategoryCount,
  getCategoryFavor,
  getAmount,
  getCategorySale,
  getAddressSale
} = require('../modules/goods/controller/goods.controller');
const baseServerError = require('../shared/middleware/base_error.middleware');

const goodsRouter = new KoaRouter({ prefix: '/goods' });

// 商品列表
goodsRouter.post('/list', verifyAuth, list)
// 商品类别数量
goodsRouter.get('/category/count', verifyAuth, getCategoryCount)
// 商品收藏数量
goodsRouter.get('/category/favor', verifyAuth, getCategoryFavor)
// 查询商品总量
goodsRouter.get('/amount/list', verifyAuth, getAmount)
// 查询类别销量
goodsRouter.get('/category/sale', verifyAuth, getCategorySale)
// 查询地区销量
goodsRouter.get('/address/sale', verifyAuth, getAddressSale)

module.exports = goodsRouter;
