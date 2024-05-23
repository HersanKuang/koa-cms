import roleService from '../service/role.service'
import { SERVER_BASE_ERROR } from '../../../config/error.constant'

class RoleController {
  async create(ctx: KoaCTX) {
    try {
      const { name, intro } = ctx.request.body
      const result = await roleService.create({ name, intro })
      // 获取新建的角色的id
      const roleId = await roleService.queryRoleId()
      let menuIds = ctx.request.body.menuList ?? []

      // 对管理员的权限处理
      if (Number(roleId) === 1) {
        menuIds = []
        for (let i = 1; i <= 40; i++) {
          menuIds.push(i)
        }
      }
      // 对角色授权
      await roleService.assignMenu(roleId, menuIds)

      // 返回结果
      ctx.body = {
        code: 0,
        message: '创建角色成功',
        data: result
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
  async remove(ctx: KoaCTX) {
    try {
      const roleId = ctx.params.roleId
      await roleService.remove(roleId)
      ctx.body = {
        code: 0,
        message: '删除角色成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async update(ctx: KoaCTX) {
    try {
      const roleId = ctx.params.roleId
      await roleService.assignMenu(roleId, ctx.request.body?.menuList ?? [])
      delete ctx.request.body?.menuList
      await roleService.update(roleId, ctx.request.body)
      ctx.body = {
        code: 0,
        message: '更新角色成功~'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  async list(ctx: KoaCTX) {
    try {
      // 1.获取角色的基本信息
      const { offset = 0, size = 100 } = ctx.query
      // connection.query的参数要传数字类型
      const result: any = await roleService.list(Number(offset), Number(size))

      // 2.获取角色的菜单信息
      for (const role of result) {
        role.menuList = await roleService.getRoleMenu(role.id)
      }

      ctx.body = {
        code: 0,
        data: {
          list: result,
          totalCount: result.length
        }
      }
    } catch (e) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  // 给角色分配权限
  async assignMenu(ctx: KoaCTX) {
    try {
      const roleId = ctx.params.roleId
      let menuIds = ctx.request.body.menuList ?? []

      // 对管理员的权限处理
      if (Number(roleId) === 1) {
        menuIds = []
        for (let i = 1; i <= 40; i++) {
          menuIds.push(i)
        }
      }

      await roleService.assignMenu(roleId, menuIds)
      ctx.body = {
        code: 0,
        message: '更新角色成功～'
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }

  // 获取当前角色的菜单
  async userMenu(ctx: KoaCTX) {
    try {
      const roleId = ctx.params.roleId
      const result = await roleService.getRoleMenu(roleId)

      ctx.body = {
        code: 0,
        data: result
      }
    } catch (error) {
      ctx.app.emit('error', SERVER_BASE_ERROR, ctx)
    }
  }
}

export default new RoleController()
export const { create, remove, update, list, assignMenu, userMenu } =
  new RoleController()
