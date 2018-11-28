'use strict';

// const { flags: flag } = require('@oclif/command');
const path = require('path');
const util = require('util');
const fs = require('fs');
const dir = require('node-dir');
const prettier = require('prettier');
const BaseCommand = require('./base-command');
const cssToObject = require('../helpers/css-to-obj');

class CSSToObjCommand extends BaseCommand {
  async run() {
    const { args } = this.parse(CSSToObjCommand);
    // TODO: ignore node_modules
    const files = await dir.promiseFiles(args.dir);
    for (const file of files) {
      if (!file.includes('node_modules') && file.endsWith('.css')) {
        const css = fs.readFileSync(file, 'utf-8');
        const js = cssToObject(css, {
          camelCase: true,
          numbers: false,
        });
        const jsName = `${file}.js`;
        fs.writeFileSync(
          jsName,
          prettier.format(`export default ${util.inspect(js)}`, {
            parser: 'babylon',
            singleQuote: true,
            trailingComma: 'es5',
          }),
          'utf-8'
        );
        this.log(`${file} => ${jsName}`);
      }
    }
    this.success('Done');
  }
}

CSSToObjCommand.args = [
  {
    name: 'dir',
    required: false,
    description: 'CSS directory',
    parse(cssDir) {
      if (cssDir[0] === '.' || cssDir[0] === '..') {
        return path.resolve(process.cwd(), cssDir);
      }
      return cssDir;
    },
    default: process.cwd(),
  },
];

CSSToObjCommand.description = `Convert CSS to js`;

// CSSToObjCommand.flags = {
//   type: flag.string({
//     char: 't',
//     description: 'boilerplate type',
//   }),
// };

CSSToObjCommand.usage = 'css-to-js';
CSSToObjCommand.examples = ['$ dev css-to-js'];

module.exports = CSSToObjCommand;
