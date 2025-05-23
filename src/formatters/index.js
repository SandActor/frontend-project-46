import formatStylish from './stylish';
import formatPlain from './plain';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const formatDiff = (diff, formatName = 'stylish') => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter(diff);
};

export default formatDiff;
