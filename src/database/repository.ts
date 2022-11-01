import pool from './pool'
import toCamelCase from '../utils/to-camel-case'
import getKeyVal from '../utils/keys-values'

class Repository {
  tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  static table(tableName: string) {
    return new Repository(tableName)
  }

  async find<T>(where: T) {
    const { keysWhere, valuesWhere } = getKeyVal(where)
    const query = `SELECT *  
        FROM ${this.tableName} ${keysWhere && 'WHERE ' + keysWhere}`
    const { rows } = await pool.query(query, valuesWhere)
    return toCamelCase(rows)
  }

  async insert<T>(body: T) {
    const { keys, valuesSet, sign } = getKeyVal(body)
    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${sign}) RETURNING *;`
    const { rows } = await pool.query(query, valuesSet)
    return toCamelCase(rows)[0]
  }

  async update<T>(id: number, body: T) {
    const { keysSet, valuesSet } = getKeyVal(body)
    const query = `UPDATE ${this.tableName} SET ${keysSet} WHERE id = $${valuesSet.length + 1} 
        RETURNING *;`
    const { rows } = await pool.query(query, [...valuesSet, id])
    return toCamelCase(rows)[0]
  }

  async delete(id: number) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *;`
    const { rows } = await pool.query(query, [id])
    return toCamelCase(rows)[0]
  }
}

export default Repository
