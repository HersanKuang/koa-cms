import connection from '@/app/databases'

class UserService {
  async create(userInfo: UserInfoType) {
    const keys = Object.keys(userInfo)
    const values = Object.values(userInfo)

    const columns = keys.join(', ')
    const placeholders = keys.map(() => '?').join(', ')
    const statement = `INSERT INTO user (${columns}) VALUES (${placeholders});`
    return await connection.execute(statement, values)
  }

  async update(userId: string, userInfo: Record<string, any>) {
    const keys = Object.keys(userInfo)
    const values = Object.values(userInfo)
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const statement = `UPDATE user SET ${setClause} WHERE id = ?;`
    return await connection.execute(statement, [...values, userId])
  }

  async findUserName(name: string) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    return await connection.execute(statement, [name])
  }

  async remove(userId: string) {
    const statement = 'DELETE FROM `user` WHERE id = ?;'
    return await connection.execute(statement, [userId])
  }

  async list(offset: number, size: number, rest: Record<string, any>) {
    // 处理查询
    const conditions = Object.entries(rest)
      .filter(([, value]) => value !== '')
      .map(([key]) => `${key} = ?`)
      .join(' AND ')
    // sql传值处理
    const values = Object.values(rest)
      .filter((value) => value !== '')
      .concat(offset, size)
    // 判断当前请求是分页还是查询
    const isQuery =
      Object.values(rest).filter((value) => value !== '').length > 0
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
    const [result] = await connection.query(
      isQuery ? queryStatement : listStatement,
      values
    )
    const [[totalResult]]: any[] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }

  async userDetail(userId: string) {
    const statement = 'SELECT * FROM user WHERE id = ?;'
    return await connection.execute(statement, [userId])
  }
  async departmentDetail(departmentsId: string) {
    const statement = 'SELECT * FROM departments WHERE id = ?;'
    return await connection.execute(statement, [departmentsId])
  }
  async roleDetail(rolesId: string) {
    const statement = 'SELECT * FROM roles WHERE id = ?;'
    return await connection.execute(statement, [rolesId])
  }
}

export default new UserService()
