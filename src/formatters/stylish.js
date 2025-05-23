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

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4;
  const baseIndent = ' '.repeat(depth * indentSize);
  const statusIndent = baseIndent.slice(2);

  const lines = diff.map((node) => {
    const { key, type } = node;
    const formatNodeValue = (value) => { return type === 'nested' ? formatStylish(value, depth + 1) : stringifyValue(value, indentSize, depth) };

    switch (type) {
      case 'added':
        return `${statusIndent}+ ${key}: ${formatNodeValue(node.value)}`;
      case 'deleted':
        return `${statusIndent}- ${key}: ${formatNodeValue(node.value)}`;
      case 'changed':
        return [
          `${statusIndent}- ${key}: ${formatNodeValue(node.oldValue)}`,
          `${statusIndent}+ ${key}: ${formatNodeValue(node.value)}`,
        ].join('\n');
      case 'nested':
        return `${baseIndent}${key}: {\n${formatNodeValue(node.children)}\n${baseIndent}}`;
      case 'unchanged':
        return `${baseIndent}${key}: ${formatNodeValue(node.value)}`;
      default:
        return null;
    }
  });

  return depth === 1 ? `{\n${lines.join('\n')}\n}` : lines.join('\n');
};

export default formatStylish;
