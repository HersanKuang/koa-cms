import connection from '../../app/databases'

class CatchUserInfoService {
  findUserName(name: string) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    return connection.execute(statement, [name])
  }

  findUserId(id: number) {
    const statement = 'SELECT * FROM `user` WHERE id = ?;'
    return connection.execute(statement, [id])
  }
}

export default new CatchUserInfoService()
