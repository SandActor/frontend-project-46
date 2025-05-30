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

export { getExtention, readFile }
