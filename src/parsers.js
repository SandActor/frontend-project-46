import yaml from 'js-yaml';

const parseFile = (strContent, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(strContent);
    case 'yml':
    case 'yaml':
      return yaml.load(strContent);
    default:
      throw new Error('The extension is not supported');
  }
};
export default parseFile;
