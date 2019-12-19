import path from 'path';

import util from 'util';
import fs from 'fs';
import dir from 'node-dir';
import prettier from 'prettier';
import BaseCommand from './base-command';
import cssToObject from '../helpers/css-to-obj';

class CSSToObjCommand extends BaseCommand {
  static args = [
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

  static description = `Convert CSS to js`;

  // static flags = {
  //   type: flag.string({
  //     char: 't',
  //     description: 'boilerplate type',
  //   }),
  // };

  static usage = 'css-to-js';
  static examples = ['$ dev css-to-js'];

  async run() {
    const { args } = this.parse(CSSToObjCommand);
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
  }
}

export default CSSToObjCommand;
