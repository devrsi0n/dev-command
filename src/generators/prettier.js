'use strict';

const Generator = require('./base-generator');

class PrettierGenerator extends Generator {
  async writing() {
    this.copyBoilerplate('.prettierrc.ejs');
    this.install(['prettier', 'lint-staged', 'husky@next']);
    this.extendPackage({
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
