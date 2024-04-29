const connection = require('@/app/databases')

class UserService {
  /**
   * @param {string} id 用户id
   * @param {string} name 用户名
   * @param {string} realname 真实姓名
   * @param {string} password 密码
   * @param {string} cellphone 电话号码
   * @param {number} enable 启用状态：启用1，禁用0
   * @param {number} departmentId 部门id
   * @param {number} roleId 角色id
   */
  async create(userInfo) {
    const keys = Object.keys(userInfo);
    const values = Object.values(userInfo);

    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const statement = `INSERT INTO user (${columns}) VALUES (${placeholders});`;
    return await connection.execute(statement, values)
  }

  async update(userId, userInfo) {
    const keys = Object.keys(userInfo);
    const values = Object.values(userInfo);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const statement = `UPDATE user SET ${setClause} WHERE id = ?;`
    return await connection.execute(statement, [...values, userId])
  }

  async findUserName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    return await connection.execute(statement, [name])
  }

  async remove(userId) {
    const statement = 'DELETE FROM `user` WHERE id = ?;'
    return await connection.execute(statement, [userId])
  }

  async list(offset, size, rest) {
    // 处理查询
    const conditions = Object.entries(rest)
      .filter(([key, value]) => value !== '')
      .map(([key]) => `${key} = ?`).join(' AND ')
    // sql传值处理
    const values = Object.values(rest)
      .filter((value) => value !== '')
      .concat(offset, size)
    // 判断当前请求是分页还是查询
    const isQuery = Object.values(rest).filter((value) => value !== '').length > 0;
    // 查询的sql预处理语句
    const queryStatement = `
      SELECT SQL_CALC_FOUND_ROWS
        *
      FROM
        user
      WHERE
        ${conditions}
      ORDER BY
        id ASC
      LIMIT ?, ?;
    `
    // 分页的sql预处理语句
    const listStatement = `
      SELECT SQL_CALC_FOUND_ROWS
        *
      FROM
        user
      LIMIT ?, ?;
    `
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(isQuery ? queryStatement : listStatement, values)
    const [[totalResult]] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount:  totalResult.total
    }
  }

  async userDetail(userId) {
    const statement = 'SELECT * FROM user WHERE id = ?;'
    return await connection.execute(statement, [userId])
  }
  async departmentDetail(departmentsId) {
    const statement = 'SELECT * FROM departments WHERE id = ?;'
    return await connection.execute(statement, [departmentsId])
  }
  async roleDetail(rolesId) {
    const statement = 'SELECT * FROM roles WHERE id = ?;'
    return await connection.execute(statement, [rolesId])
  }
}

module.exports = new UserService()
