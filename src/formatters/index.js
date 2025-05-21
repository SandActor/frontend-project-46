import stylish from './stylish';
import plain from './plain';
import json from './json';

const formatters = {
  stylish,
  plain,
  json,
};

export default (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
