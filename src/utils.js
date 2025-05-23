import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const getExtention = (filename) => {
  const splitName = filename.split('.');
  const extention = splitName.slice(-1);
  const result = extention[0];
  return result;
};
const readFile = (filePath) => {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const compareAndSort = (obj1, obj2) => {
  const iter = (o1, o2, level) => {
    const unionObj = { ...o1, ...o2 };
    const sortedKeys = _.sortBy(Object.keys(unionObj));

    return sortedKeys.map((key) => {
      if (Object.hasOwn(o1, key) && !Object.hasOwn(o2, key)) {
        return {
          key,
          type: 'deleted',
          value: o1[key],
          level,
        };
      }
      if (!Object.hasOwn(o1, key) && Object.hasOwn(o2, key)) {
        return {
          key,
          type: 'added',
          value: o2[key],
          level,
        };
      }
      if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
        return {
          key,
          type: 'nested',
          children: iter(o1[key], o2[key], level + 1),
          level,
        };
      }
      if (o1[key] !== o2[key]) {
        return {
          key,
          type: 'changed',
          oldValue: o1[key],
          value: o2[key],
          level,
        };
      }
      return {
        key,
        type: 'unchanged',
        value: o1[key],
        level,
      };
    });
  };
  return iter(obj1, obj2, 1);
};

export { compareAndSort, getExtention, readFile };
