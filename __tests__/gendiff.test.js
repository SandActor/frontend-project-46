import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index'
import { describe, test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => {
  return path.join(__dirname, '..', '__fixtures__', filename)
}
const readFile = (filepath) => {
  return fs.readFileSync(filepath, 'utf-8')
}

describe('stylish json', () => {
  test('genDiff with different files json', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expectedFilePath = getFixturePath('expected_stylish.txt')

    const expectedOutput = readFile(expectedFilePath)
    const result = genDiff(filepath1, filepath2)
    
    expect(result).toBe(expectedOutput)
  })
})
describe('stylish yml', () => {
  test('genDiff with different files yml', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    const expectedFilePath = getFixturePath('expected_stylish.txt')

    const expectedOutput = readFile(expectedFilePath)
    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expectedOutput)
  })
})
describe('plain', () => {
  test('genDiff with different files plain', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expectedFilePath = getFixturePath('expected_plain.txt')

    const expectedOutput = readFile(expectedFilePath)
    const result = genDiff(filepath1, filepath2, 'plain')

    expect(result).toBe(expectedOutput)
  })
})
describe('json', () => {
  test('genDiff with different files json', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    const expectedFilePath = getFixturePath('expected_json.txt')

    const expectedOutput = readFile(expectedFilePath)
    const result = genDiff(filepath1, filepath2, 'json')

    expect(result).toBe(expectedOutput)
  })
})
