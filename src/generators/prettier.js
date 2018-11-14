'use strict';

const Generator = require('./base-generator');

class PrettierGenerator extends Generator {
  async writing() {
    this.copyBoilerplate('.prettierrc.ejs');
    await this.install(this._getPackages());
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

  /**
   * For rewrite packages
   */
  _getPackages() {
    return ['prettier', 'lint-staged', 'husky'];
  }
}

module.exports = PrettierGenerator;
