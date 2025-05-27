const INDENT_SIZE = 4

const getIndent = (depth) => ' '.repeat(depth * INDENT_SIZE)
const getStatusIndent = (depth) => ' '.repeat(depth * INDENT_SIZE - 2)

const stringifyValue = (value, depth = 0) => {
  if (value === null) return 'null'
  if (typeof value !== 'object') return String(value)

  const currentIndent = getIndent(depth)
  const innerIndent = getIndent(depth + 1)
  const entries = Object.entries(value)

  const lines = entries.map(([key, val]) => (
    `${innerIndent}${key}: ${stringifyValue(val, depth + 1)}`
  ))

  return `{\n${lines.join('\n')}\n${currentIndent}}`
}

const formatNode = {
  added: (node, depth) => `${getStatusIndent(depth)}+ ${node.key}: ${stringifyValue(node.value, depth)}`,
  deleted: (node, depth) => `${getStatusIndent(depth)}- ${node.key}: ${stringifyValue(node.value, depth)}`,
  changed: (node, depth) => [
    `${getStatusIndent(depth)}- ${node.key}: ${stringifyValue(node.oldValue, depth)}`,
    `${getStatusIndent(depth)}+ ${node.key}: ${stringifyValue(node.value, depth)}`,
  ].join('\n'),
  nested: (node, depth) => {
    const indent = getIndent(depth)
    return [
      `${indent}${node.key}: {`,
      formatStylish(node.children, depth + 1),
      `${indent}}`
    ].join('\n')
  },
  unchanged: (node, depth) => `${getIndent(depth)}${node.key}: ${stringifyValue(node.value, depth)}`
}

const formatStylish = (diff, depth = 0) => {
  const lines = diff.map((node) => formatNode[node.type]?.(node, depth) ?? null)
  const result = lines.join('\n')
  
  return depth === 0 ? `{\n${result}\n}` : result
}

export default formatStylish
