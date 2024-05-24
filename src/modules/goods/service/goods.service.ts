import connection from '@/app/databases'

class GoodsService {
  private readonly amountMap: {
    saleroom: string
    sale: string
    favor: string
    inventory: string
  }
  constructor() {
    this.amountMap = {
      sale: '销量',
      favor: '收藏',
      inventory: '库存',
      saleroom: '销售额'
    }
  }
  async list(offset: number, size: number) {
    const statement = 'SELECT SQL_CALC_FOUND_ROWS * FROM products LIMIT ?, ?;'
    const totalStatement = 'SELECT FOUND_ROWS() AS total;'
    const [result] = await connection.query(statement, [offset, size])
    const [[totalResult]]: any[] = await connection.execute(totalStatement)
    return {
      list: result,
      totalCount: totalResult.total
    }
  }

  async getCategoryCount() {
    const statement = 'SELECT id, name FROM category;'
    const queryStatement =
      'SELECT COUNT(*) AS goodsCount FROM products WHERE categoryId = ?;'
    const [result]: any[] = await connection.query(statement, [statement])

    for (const item of result) {
      const [[{ goodsCount }]]: any[] = await connection.query(queryStatement, [
        item.id
      ])
      item.goodsCount = goodsCount
    }
    return result
  }

  async getCategoryFavor() {
    const statement = 'SELECT id, name FROM category;'
    const queryStatement =
      'SELECT categoryId, SUM(favorCount) AS goodsFavor FROM products WHERE categoryId = ?;'
    const [result]: any[] = await connection.query(statement, [statement])

    for (const item of result) {
      const [[{ goodsFavor }]]: any[] = await connection.query(queryStatement, [
        item.id
      ])
      item.goodsFavor = goodsFavor
    }
    return result
  }

  async getAmount() {
    const keys = Object.keys(this.amountMap) as Array<
      keyof typeof this.amountMap
    >
    const data = []

    for (const key of keys) {
      const name = key === 'saleroom' ? 'saleCount * newPrice' : `${key}Count`
      const statement = `SELECT SUM(${name}) AS ${key} FROM products;`
      const [[result]]: any[] = await connection.execute(statement)
      data.push({
        amount: key,
        number1: Math.round(result[key]),
        number2: Math.round(result[key]),
        subtitle: `商品总${this.amountMap[key]}`,
        tips: `所有商品的总${this.amountMap[key]}`,
        title: `商品总${this.amountMap[key]}`
      })
    }
    return data
  }

  async getCategorySale() {
    const statement = 'SELECT id, name FROM category;'
    const queryStatement =
      'SELECT SUM(saleCount) AS goodsCount FROM products WHERE categoryId = ?;'
    const [result]: any[] = await connection.query(statement, [statement])

    for (const item of result) {
      const [[{ goodsCount }]]: any[] = await connection.query(queryStatement, [
        item.id
      ])
      item.goodsCount = goodsCount
    }
    return result
  }

  async getAddressSale() {
    const statement =
      'SELECT address, SUM(saleCount) AS count FROM products GROUP BY address;'
    const [result] = await connection.execute(statement)
    return result
  }
}

export default new GoodsService()
