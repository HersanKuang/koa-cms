const Koa = require('koa')
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')
const registerRouters = require('@/router')

// 1.创建app
const app = new Koa()

// 使用CORS中间件
app.use(cors());

// 2.对app使用中间件
app.use(bodyParser())
registerRouters(app)

module.exports = app
