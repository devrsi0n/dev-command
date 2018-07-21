'use strict';

const Generator = require('./base-generator');

class PrettierGenerator extends Generator {
  async writing() {
    const from = this.templatePath('.prettierrc.ejs');
    const to = this.destinationPath('.prettierrc');
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
    this.install(['prettier', 'lint-staged', 'husky@next']);
    this.fs.extendJSON(this.destinationPath('package.json'), {
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.{json,css,md}': ['prettier --write', 'git add'],
      },
    });
  }
}

module.exports = PrettierGenerator;
