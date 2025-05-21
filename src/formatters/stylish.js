import _ from 'lodash';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${formatValue(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const buildStylishLines = (nodes, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);
  const lines = nodes.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${buildStylishLines(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4 - 4)}}`;
};

export default (diffTree) => buildStylishLines(diffTree);