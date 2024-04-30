import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import goods from '../modules/goods/controller/goods.controller'

const goodsRouter = new Router({ prefix: '/goods' })

// 商品列表
goodsRouter.post('/list', verifyAuth, goods.list)
// 商品类别数量
goodsRouter.get('/category/count', verifyAuth, goods.getCategoryCount)
// 商品收藏数量
goodsRouter.get('/category/favor', verifyAuth, goods.getCategoryFavor)
// 查询商品总量
goodsRouter.get('/amount/list', verifyAuth, goods.getAmount)
// 查询类别销量
goodsRouter.get('/category/sale', verifyAuth, goods.getCategorySale)
// 查询地区销量
goodsRouter.get('/address/sale', verifyAuth, goods.getAddressSale)

export default goodsRouter
