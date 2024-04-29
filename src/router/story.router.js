const KoaRouter = require('@koa/router')
const baseServerError = require('../shared/middleware/base_error.middleware');
const verifyAuth = require('../shared/middleware/verify_auth.middleware');
const { create, list } = require('../modules/story/controller/story.controller');

const storyRouter = new KoaRouter({ prefix: '/story' })

storyRouter.post('/create', verifyAuth, create)
storyRouter.post('/list', verifyAuth, list)

module.exports = storyRouter
