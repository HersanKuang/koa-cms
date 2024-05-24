import connection from '@/app/databases'

class DepartmentService {
  async create(departmentInfo: Record<string, any>) {
    const statement = 'INSERT INTO departments SET ?;'
    const [result] = await connection.query(statement, [departmentInfo])
    return result
  }

  async update(id: string, departmentInfo: Record<string, any>) {
    const statement = 'UPDATE departments SET ? WHERE id = ?;'
    const [result] = await connection.query(statement, [departmentInfo, id])
    return result
  }

  async remove(departmentId: string) {
    const statement = 'DELETE FROM `departments` WHERE id = ?;'
    return await connection.execute(statement, [departmentId])
  }

  async list(offset: number, size: number) {
    const statement =
      'SELECT SQL_CALC_FOUND_ROWS * FROM departments LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]]: any[] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

export default new DepartmentService()
