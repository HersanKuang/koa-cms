const connection = require('@/app/databases')

class DepartmentService {
  async create(departmentInfo) {
    const statement = 'INSERT INTO departments SET ?;'
    const [result] = await connection.query(statement, [departmentInfo])
    return result
  }

  async update(id, departmentInfo) {
    const statement = 'UPDATE departments SET ? WHERE id = ?;'
    const [result] = await connection.query(statement, [departmentInfo, id])
    return result
  }

  async remove(departmentId) {
    const statement = 'DELETE FROM `departments` WHERE id = ?;'
    return await connection.execute(statement, [departmentId])
  }

  async list(offset, size) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM departments LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

module.exports = new DepartmentService()
