import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('genDiff', () => {
  test('should compare flat files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFile('expected_flat.txt');
    
    expect(genDiff(file1, file2)).toEqual(expected);
  });

  test('should compare nested files', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFile('expected_nested.txt');
    
    expect(genDiff(file1, file2)).toEqual(expected);
  });

  test('should compare yaml files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expected = readFile('expected_yaml.txt');
    
    expect(genDiff(file1, file2)).toEqual(expected);
  });
});