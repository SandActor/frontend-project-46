import _ from 'lodash'

const getTree = (data1, data2) => {
  const unionObj = { ...data1, ...data2 }
  const sortedKeys = _.sortBy(Object.keys(unionObj))

  return sortedKeys.map((key) => {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      }
    }

    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      }
    }

    if (typeof data1[key] === 'object' && typeof data2[key] === 'object' && !Array.isArray(data1[key]) && !Array.isArray(data2[key])) {
      return {
        key,
        type: 'nested',
        children: getTree(data1[key], data2[key]),
      }
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: data1[key],
        value: data2[key],
      }
    }

    return {
      key,
      type: 'unchanged',
      value: data1[key],
    }
  })
}

export { getTree }
