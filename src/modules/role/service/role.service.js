const connection = require('@/app/databases')
const menuService = require('../../menu/service/menu.service')

class RoleService {
  async create(role) {
    const statement = `INSERT INTO roles SET ?;`
    const [result] = await connection.query(statement, [role])
    return result
  }

  async update(roleId, role) {
    const statement = `UPDATE roles SET ? WHERE id = ?;`
    const [result] = await connection.query(statement, [role, roleId])
    return result
  }

  async remove(roleId) {
    const statement = 'DELETE FROM `roles` WHERE id = ?;'
    return await connection.execute(statement, [roleId])
  }

  async list(offset = 0, size = 100) {
    const statement = `SELECT * FROM roles LIMIT ?, ?;`
    const [result] = await connection.query(statement, [offset, size])
    return result
  }

  async assignMenu(roleId, menuIds) {
    // 1.先删除之前的关系
    const deleteStatement = `DELETE FROM roles_menus WHERE roleId = ?;`
    await connection.query(deleteStatement, [roleId])

    // 2.插入新的值
    const insertStatement = `INSERT INTO roles_menus (roleId, menuId) VALUES (?, ?);`
    for (const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId])
    }
  }

  async queryRoleId() {
    const statement = `SELECT id FROM roles ORDER BY updateAt DESC LIMIT 1;`
    const [[result]] = await connection.execute(statement)
    return result.id
  }

  async getRoleMenu(roleId) {
    // 1.根据roleId获取所有的menuId
    const getMenuIdsStatement = `
        SELECT
          rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds
        FROM roles_menus rm
        WHERE rm.roleId = ?
        GROUP BY rm.roleId;
      `
    const [roleMenuIds] = await connection.query(getMenuIdsStatement, [roleId])
    const menuIds = roleMenuIds.shift()?.menuIds

    // 2.获取完整的菜单树
    const wholeMenu = await menuService.wholeMenu()

    // 3.从完整的菜单树中过滤掉menuIds
    function filterMenu(menu) {
      const newMenu = []
      for (const item of menu) {
        if (item.children) {
          item.children = filterMenu(item.children)
        }
        if (menuIds && menuIds.includes(item.id)) {
          newMenu.push(item)
        }
      }
      return newMenu
    }
    return filterMenu(wholeMenu)
  }
}

module.exports = new RoleService()
