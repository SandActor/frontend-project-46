const stringifyValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const formatPlain = (diff, parentPath = '') => {
  const messages = diff.map((node) => {
    const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringifyValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.value)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      default:
        return null;
    }
  });

  return messages.filter(Boolean).join('\n');
};

export default formatPlain;