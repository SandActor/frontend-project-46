#!/usr/bin/env node

import { Command } from 'commander'
import genDiff from '../src/index.js'
import { argv } from process

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (default: "stylish")', 'stylish')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format))
  })

program.parse(argv)
