import connection from '@/app/databases'

class CategoryService {
  async create(categoryInfo: Record<string, any>) {
    const statement = 'INSERT INTO category SET ?;'
    const [result] = await connection.query(statement, [categoryInfo])
    return result
  }
  async list(offset: number, size: number) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM category LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]]: any[] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

export default new CategoryService()
