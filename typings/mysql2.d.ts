// @types/mysql2 库在使用 tsc 编译的时候太多报错，手动声明 mysql2
declare module 'mysql2' {
  import {
    ConnectionOptions,
    Pool as BasePool,
    PoolConnection as BasePoolConnection,
    MysqlError as BaseMysqlError
  } from 'mysql'

  export interface Pool extends BasePool {
    getConnection(
      callback: (err: MysqlError | null, connection: PoolConnection) => void
    ): void
    promise(): any
  }

  export interface PoolConnection extends BasePoolConnection {
    connect(callback: (err: MysqlError | null) => void): void
  }

  export function createPool(config: ConnectionOptions): Pool

  export type MysqlError = BaseMysqlError
}
