import _ from 'lodash';
import yaml from 'js-yaml';

const parseData = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

const stringifyValue = (value, indentSize, depth) => {
  if (value === null) return 'null';
  if (typeof value !== 'object') return String(value);

  const currentIndent = ' '.repeat(depth * indentSize);
  const innerIndent = ' '.repeat((depth + 1) * indentSize);
  const entries = Object.entries(value);

  const lines = entries.map(([key, val]) => (
    `${innerIndent}${key}: ${stringifyValue(val, indentSize, depth + 1)}`
  ));

  return `{\n${lines.join('\n')}\n${currentIndent}}`;
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4;
  const baseIndent = ' '.repeat(depth * indentSize);
  const statusIndent = baseIndent.slice(2);

  const lines = diff.map((node) => {
    const { key, type } = node;
    const formatNodeValue = (value) => {
      return type === 'nested' ? formatStylish(value, depth + 1) : stringifyValue(value, indentSize, depth);
    };

    switch (type) {
      case 'added':
        return `${statusIndent}+ ${key}: ${formatNodeValue(node.value)}`
      case 'deleted':
        return `${statusIndent}- ${key}: ${formatNodeValue(node.value)}`
      case 'changed':
        return [
          `${statusIndent}- ${key}: ${formatNodeValue(node.oldValue)}`,
          `${statusIndent}+ ${key}: ${formatNodeValue(node.value)}`,
        ].join('\n')
      case 'nested':
        return `${baseIndent}${key}: {\n${formatNodeValue(node.children)}\n${baseIndent}}`
      case 'unchanged':
        return `${baseIndent}${key}: ${formatNodeValue(node.value)}`
      default:
        return null
    }
  }).filter(Boolean)

  return depth === 1 ? `{\n${lines.join('\n')}\n}` : lines.join('\n')
}

const genDiff = (filepath1, filepath2) => {
  const getFormat = (filename) => {
    const ext = filename.split('.').pop()
    return ext === 'json' ? 'json' : 'yml'
  }

  const content1 = fs.readFileSync(filepath1, 'utf-8')
  const content2 = fs.readFileSync(filepath2, 'utf-8')

  const obj1 = parseData(content1, getFormat(filepath1))
  const obj2 = parseData(content2, getFormat(filepath2))

  const diff = buildDiff(obj1, obj2)
  return formatStylish(diff)
}

export default genDiff
