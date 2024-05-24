import connection from '@/app/databases'

class MenuService {
  async create(menu: Record<string, any>) {
    const statement = `INSERT INTO menus SET ?;`
    const [result] = await connection.query(statement, [menu])
    return result
  }

  // 获取完整菜单树
  async wholeMenu() {
    const statement = `
      SELECT
        m1.id id, m1.name name, m1.type type, m1.url url, m1.icon icon, m1.sort sort, m1.createAt createAt,
        m1.updateAt updateAt,
        (SELECT JSON_ARRAYAGG(
          JSON_OBJECT("id", m2.id, "name", m2.name, "type", m2.type, "parentId", m2.parentId, "url", m2.url,
          "sort", m2.sort, "createAt", m2.createAt, "updateAt", m2.updateAt,
            "children", (SELECT JSON_ARRAYAGG(
              JSON_OBJECT("id", m3.id, "name", m3.name, "type", m3.type, "parentId", m3.parentId, "url", m3.url,
              "sort", m3.sort, "permission", m3.permission, "createAt", m3.createAt, "updateAt", m3.updateAt)
            ) FROM menus m3 WHERE m3.parentId = m2.id ORDER BY m3.sort))
        ) FROM menus m2 WHERE m1.id = m2.parentId ORDER BY m2.sort) children
      FROM menus m1
      WHERE m1.type = 1;
    `
    const [result] = await connection.query(statement)
    return result
  }
}

export default new MenuService()
