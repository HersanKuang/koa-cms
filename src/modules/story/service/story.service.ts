import connection from '@/app/databases'

class StoryService {
  async create(storyInfo: Record<string, any>) {
    const statement = 'INSERT INTO story SET ?;'
    const [result] = await connection.query(statement, [storyInfo])
    return result
  }
  async list(offset: number, size: number) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM story LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]]: any[] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }
}

export default new StoryService()
