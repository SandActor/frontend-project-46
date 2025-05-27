import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import { cwd } from 'process'

const getExtention = (filename) => {
  const splitName = filename.split('.')
  const extention = splitName.slice(-1)
  const result = extention[0]
  return result
}
const readFile = (filePath) => {
  const dirName = cwd(filePath)
  const fullPath = path.resolve(dirName, filePath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const getTree = (obj1, obj2, level = 1) => {
  const unionObj = { ...obj1, ...obj2 }
  const sortedKeys = _.sortBy(Object.keys(unionObj))

  return sortedKeys.map((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
        level,
      }
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
        level,
      }
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return {
        key,
        type: 'nested',
        children: getTree(obj1[key], obj2[key], level + 1),
        level,
      }
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
        level,
      }
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
      level,
    }
  })
}

export { getTree, getExtention, readFile }
