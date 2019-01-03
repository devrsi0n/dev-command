'use strict';

const Generator = require('./base-generator');

class PrettierGenerator extends Generator {
  async writing() {
    this.copyBoilerplate('.prettierrc.ejs');
    await this.install(this._getPackages());
    this.extendPackage({
      scripts: {
        prettier: 'prettier --write src/',
      },
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.{html,json,css,md}': ['prettier --write', 'git add'],
        ignore: ['**/dist/**/*.js', '**/lib/**/*.js', '**/build/**/*.js'],
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
