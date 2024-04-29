const connection = require('@/app/databases')

class StoryService {
  async create(storyInfo) {
    const statement = 'INSERT INTO story SET ?;'
    const [result] = await connection.query(statement, [storyInfo])
    return result
  }
  async list(offset, size) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM story LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

module.exports = new StoryService()
