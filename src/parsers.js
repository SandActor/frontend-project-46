import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

const parseFile = (content, format) => {
  const parser = parsers[format]
  if (!parser) {
    throw new Error(`Unsupported format: '${format}'`)
  }
  return parser(content)
}

export default parseFile
