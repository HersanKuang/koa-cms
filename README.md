# koa-cms
群友要求分享的coderwhy的vue3-ts的cms项目后端代码，欢迎pr👏

### 运行项目
- 使用 pnpm
  - `pnpm install`
- 修改 mysql 的配置
  - .env.* 文件中
- 开发环境
  - `pnpm start:dev`
- 打包之后部署服务器
  - 使用 tsc 编译成 cjs 代码：`pnpm build`
  - 测试打包后的代码是否能正常运行：`pnpm serve`

### 理解思路
- 为了方便同学们更好的理解这个项目，可以参照以下理解思路，成功启动项目之后：
- 从 `@/router` 目录找到该模块的路由
- 路由的最后一个中间件是业务的逻辑处理方法
- 根据路由最后的方法去 `@/modules` 目录下找对应的模块
- `controller` 目录是业务逻辑的处理，`service` 目录是数据库的查询

### 关于数据库
- 数据库的表设计可以根据前端接口请求的参数去设计，这里不再放出 SQL 语句和表设计
- 实在需要的同学可以联系我

### 项目规划
- 后期会做更多的内容，可能包括以下内容：
- 以文件流的形式向前端传输二进制文件
- 实现单点登录
- 使用消息队列
- WebSocket实时通信
- 微服务等
