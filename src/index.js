import { readFile, getExtention } from './utils.js'
import { getTree } from './getTree.js'
import parseFile from './parsers.js'
import makeFormat from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const readFile1 = readFile(filepath1)
  const readFile2 = readFile(filepath2)
  const extention1 = getExtention(filepath1)
  const extension2 = getExtention(filepath2)
  const data1 = parseFile(readFile1, extention1)
  const data2 = parseFile(readFile2, extension2)
  const objWithType = getTree(data1, data2)
  const result = makeFormat(objWithType, format)
  return result
}

export default genDiff
