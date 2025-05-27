import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import { cwd } from 'process'

const getExtention = (filename) => {
  const splitName = filename.split('.')
  return splitName.at(-1)
}

const readFile = (filePath) => {
  const fullPath = path.resolve(cwd(), filePath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

const getTree = (obj1, obj2) => {
  const unionObj = { ...obj1, ...obj2 }
  const sortedKeys = _.sortBy(Object.keys(unionObj))

  return sortedKeys.flatMap((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      }
    }

    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      }
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: getTree(obj1[key], obj2[key]),
      }
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
      }
    }

    return []
  })
}

export { getTree, getExtention, readFile }
