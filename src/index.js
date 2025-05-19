export default function genDiff(filepath1, filepath2, format = 'stylish') {
  return `Difference between ${filepath1} and ${filepath2} in ${format} format`;
}