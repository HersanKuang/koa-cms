const connection = require('@/app/databases')

class CatchUserInfoService {
  async findUserName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    return await connection.execute(statement, [name])
  }
  async findUserId(id) {
    const statement = 'SELECT * FROM `user` WHERE id = ?;'
    return await connection.execute(statement, [id])
  }
}

module.exports = new CatchUserInfoService()
