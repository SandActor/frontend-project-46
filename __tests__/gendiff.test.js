import path from 'path';
import genDiff from '../bin/gendiff.js';
import { readFileSync } from 'fs';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  test('should compare flat YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expected = readFile('expected_yaml.txt');
    
    expect(genDiff(file1, file2)).toEqual(expected);
  });

  test('should compare flat JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFile('expected_json.txt');
    
    expect(genDiff(file1, file2)).toEqual(expected);
  });
});

describe('Plain format', () => {
  test('should format flat files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFile('expected_flat_plain.txt');
    
    expect(genDiff(file1, file2, 'plain')).toEqual(expected);
  });

  test('should format nested files', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFile('expected_nested_plain.txt');
    
    expect(genDiff(file1, file2, 'plain')).toEqual(expected);
  });
});
