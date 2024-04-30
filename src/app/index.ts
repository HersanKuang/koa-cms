import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import registerRouters from '../router'

// 1. 创建app
const app = new Koa()

// 使用CORS中间件
app.use(cors())

// 2. 对app使用中间件
app.use(bodyParser())
registerRouters(app)

// 导出 app
export default app
