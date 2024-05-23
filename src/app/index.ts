import dotenv from 'dotenv'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import registerRouters from '../router'

// 1.动态引入环境变量
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

// 2.创建app
const app = new Koa()

// 3.使用CORS中间件
app.use(cors())

// 4.对app使用中间件
app.use(bodyParser())
registerRouters(app)

// 导出 app
export default app
