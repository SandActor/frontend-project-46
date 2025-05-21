const { readFileSync } = require('fs');
const path = require('path');
const _ = require('lodash');
const yaml = require('js-yaml');

const getFormatter = require('./formatters/index.js');

const getFixturePath = (filename) => {
  const testPath = path.join(__dirname, '../__tests__/__fixtures__', filename);
  readFileSync(testPath);
  return testPath;
};

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const getFileFormat = (filepath) => path.extname(filepath).toLowerCase();

const parsers = {
  '.json': (content) => JSON.parse(content),
  '.yaml': (content) => yaml.load(content),
  '.yml': (content) => yaml.load(content),
};

const parse = (filepath) => {
  const content = readFile(filepath);
  const format = getFileFormat(filepath);
  return parsers[format](content);
};

const buildTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    return {
      key,
      type: 'changed',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const indent = ' '.repeat(4 * depth);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${' '.repeat(4 * (depth - 1))}}`;
};

const formatStylish = (tree, depth = 1) => {
  const indent = ' '.repeat(4 * depth - 2);
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${' '.repeat(4 * (depth - 1))}}`;
};

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diffTree = buildTree(data1, data2);

  if (formatName === 'stylish') {
    return formatStylish(diffTree);
  }

  const format = getFormatter(formatName);
  return format(diffTree);
}

export default genDiff;
