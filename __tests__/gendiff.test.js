import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

describe('Stylish json', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expectedFilePath = getFixturePath('expected_nested.txt');

    const expectedOutput = readFile(expectedFilePath);
    const result = genDiff(filepath1, filepath2);

    expect(result).toBe(expectedOutput);
  });
});
describe('Stylish yml', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expectedFilePath = getFixturePath('expected_nested.txt');

    const expectedOutput = readFile(expectedFilePath);
    const result = genDiff(filepath1, filepath2);

    expect(result).toBe(expectedOutput);
  });
});
describe('Plain', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expectedFilePath = getFixturePath('expected_plain.txt');

    const expectedOutput = readFile(expectedFilePath);
    const result = genDiff(filepath1, filepath2, 'plain');

    expect(result).toBe(expectedOutput);
  });
});
describe('json', () => {
  test('genDiff with different files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expectedFilePath = getFixturePath('expected_json.txt');

    const expectedOutput = readFile(expectedFilePath);
    const result = genDiff(filepath1, filepath2, 'json');

    expect(result).toBe(expectedOutput);
  });
});