const getKeyVal = <T>(data: T, where?: string[]) => {
  let keys = ''
  let keysSet = ''
  let keysWhere = ''
  const valuesSet = []
  let valuesWhere = []
  let sign = ''
  let i = 1

  for (const inputKey in data) {
    const key = inputKey.replace(/[A-Z]/g, (char, indx) => {
      return indx == 0 ? char.toLowerCase() : '_' + char.toLowerCase()
    })

    keys += (i === 1 ? '' : ', ') + `${key}`
    keysSet += (i === 1 ? '' : ', ') + `${key} = $${i}`
    keysWhere += (i === 1 ? '' : ' AND ') + `${key} = $${i} `
    valuesSet.push(data[inputKey])
    valuesWhere.push(data[inputKey])
    sign += (i === 1 ? '' : ', ') + `$${i}`

    i++
  }

  if (where) {
    keysWhere = ''
    valuesWhere = []
    let y = 1
    for (const inputKey in where) {
      const key = inputKey.replace(/[A-Z]/g, (char, indx) => {
        return indx == 0 ? char.toLowerCase() : '_' + char.toLowerCase()
      })

      keysWhere += (y === 1 ? '' : ' AND ') + `${key} = $${i}`
      valuesWhere.push(where[inputKey])

      i++
      y++
    }
  }

  return { keys, keysSet, keysWhere, valuesSet, valuesWhere, sign }
}

export default getKeyVal
