import connection from '../../app/databases'

class PermissionService {
  async checkMomentAuth(momentId: number, userId: number) {
    const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
    const [result] = await connection.execute(statement, [momentId, userId])
    return Array.isArray(result) && result.length > 0
  }

  async checkResource(
    resourceName: string,
    resourceId: number,
    userId: number
  ) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return Array.isArray(result) && result.length > 0
  }
}

export default new PermissionService()
