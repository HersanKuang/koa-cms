const connection = require('@/app/databases')

class CategoryService {
  async create(categoryInfo) {
    const statement = 'INSERT INTO category SET ?;'
    const [result] = await connection.query(statement, [categoryInfo])
    return result
  }
  async list(offset, size) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM category LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

module.exports = new CategoryService()
