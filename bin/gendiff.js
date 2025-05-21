#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .action((filepath1, filepath2, options) => {
    genDiff(filepath1, filepath2, options.format);
  });

program.parse(process.argv);
