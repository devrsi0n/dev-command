'use strict';

const Generator = require('./base-generator');

class ESLintGenerator extends Generator {
  async prompting() {
    const { name } = await this.prompt({
      type: 'list',
      name: 'name',
      message: 'ESLint configs',
      choices: [
        ...this.getESLintConfigList(),
        new this.inquirer.Separator(),
        {
          name: 'Custom npm package',
          value: 'custom',
        },
      ],
      default: '@devrsi0n/eslint-config-react',
    });
    if (name === 'custom') {
      const { customName } = await this.prompt({
        type: 'input',
        name: 'customName',
        message: 'Custom npm package name',
      });
      this.configName = customName;
      return;
    }
    this.configName = name;
  }

  getESLintConfigList() {
    return [
      'eslint-config-airbnb-base',
      'eslint-config-airbnb',
      {
        name: '@devrsi0n/eslint-config-base, integrate with prettier',
        value: '@devrsi0n/eslint-config-base',
      },
      {
        name: '@devrsi0n/eslint-config-react, integrate with prettier',
        value: '@devrsi0n/eslint-config-react',
      },
    ];
  }

  async writing() {
    this.spinner.start();
    this.copyBoilerplate('.eslintrc.ejs');
    this.copyBoilerplate('.eslintignore.ejs');
    await this.install(this._getPackages());
    this.spinner.stop();
    this.extendPackage({
      scripts: {
        eslint: 'eslint --fix src/',
      },
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.{js,jsx}': ['eslint --fix', 'git add'],
        ignore: ['**/dist/**/*.js', '**/lib/**/*.js', '**/build/**/*.js'],
      },
    });
  }

  _getPackages() {
    const { configName } = this;
    return ['eslint', configName, 'lint-staged', 'husky'];
  }
}

module.exports = ESLintGenerator;
