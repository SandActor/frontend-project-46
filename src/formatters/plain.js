const stringifyValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value}'`
  if (typeof value === 'object') return '[complex value]'
  return String(value)
}

const formatters = {
  added: (node, path) => `Property '${path}' was added with value: ${stringifyValue(node.value)}`,
  deleted: (node, path) => `Property '${path}' was removed`,
  changed: (node, path) => `Property '${path}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.value)}`,
  nested: (node, path) => formatPlain(node.children, path),
  unchanged: () => null,
}

const formatPlain = (diff, parentPath = '') => {
  const messages = diff.map((node) => {
    const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key
    return formatters[node.type]?.(node, currentPath) ?? null
  })

  return messages.filter(Boolean).join('\n')
}

export default formatPlain
