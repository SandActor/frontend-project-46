import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const parse = (data) => JSON.parse(data);

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`;
    }
    return [
      `  - ${key}: ${data1[key]}`,
      `  + ${key}: ${data2[key]}`
    ].join('\n');
  }).join('\n');
};

export default function genDiff(filepath1, filepath2) {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);
  
  const data1 = parse(file1Content);
  const data2 = parse(file2Content);
  
  const diff = buildDiff(data1, data2);
  return `{\n${diff}\n}`;
}