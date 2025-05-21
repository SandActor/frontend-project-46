const formatValue = (value) => {
  if (_.isPlainObject(value) || Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildPath = (path, key) => (path ? `${path}.${key}` : key);

const formatPlain = (tree, parentPath = '') => {
  const lines = tree.flatMap((node) => {
    const currentPath = buildPath(parentPath, node.key);
    
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default formatPlain;