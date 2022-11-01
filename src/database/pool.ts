import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { ENV, DB_HOST, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASS } = process.env

const defaultConfig = new pg.Pool({
  host: DB_HOST,
  port: 5433,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS
})

const testConfig = new pg.Pool({
  host: DB_HOST,
  port: 5433,
  database: DB_NAME_TEST,
  user: DB_USER,
  password: DB_PASS
})

class Pool {
  client: pg.Pool = defaultConfig

  constructor() {
    if (ENV === 'dev') {
      this.client = defaultConfig
    }
    if (ENV === 'test') {
      this.client = testConfig
    }
  }

  async query<T>(sql: string, values: T[]) {
    const connection = await this.client.connect()
    const result = await connection.query(sql, values)
    connection.release()
    return result
  }
}

export default new Pool()
