const { execute } = require('@/app/databases')

class PermissionService {
  async checkMomentAuth(momentId, userId) {
    const statement = 'SELECT * FROM moment WHERE id = ? AND user_id = ?;'
    const [result] = await execute(statement, [momentId, userId])
    return !!result.length
  }

  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await execute(statement, [resourceId, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()
