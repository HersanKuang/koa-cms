import Router from '@koa/router'
import verifyAuth from '../shared/middleware/verify_auth.middleware'
import { create, list } from '@/modules/story/controller/story.controller'

const storyRouter = new Router({ prefix: '/story' })

storyRouter.post('/create', verifyAuth, create)
storyRouter.post('/list', verifyAuth, list)

export default storyRouter
