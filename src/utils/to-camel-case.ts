const toCamelCase = <T>(rows: T[]) => {
  return rows.map((row) => {
    const obj: any = {}
    for (const key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''))
      obj[camelCase] = row[key]
    }
    return obj
  })
}

export default toCamelCase
