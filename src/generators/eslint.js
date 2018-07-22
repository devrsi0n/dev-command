'use strict';

const Generator = require('./base-generator');

class ESLintGenerator extends Generator {
  async prompting() {
    const { name } = await this.prompt({
      type: 'list',
      name: 'name',
      message: 'ESLint config',
      choices: [
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

  async writing() {
    this.spinner.start();
    const { configName } = this;
    this.copyBoilerplate('.eslintrc.ejs');
    await this.install([configName, 'babel-eslint']);
    await this.exec(`npx install-peerdeps --dev ${configName}`);
    this.spinner.stop();
    this.extendPackage({
      husky: {
        hooks: {
          'pre-commit': 'lint-staged',
        },
      },
      'lint-staged': {
        '*.{js,jsx}': ['eslint --fix', 'git add'],
      },
    });
  }
}

module.exports = ESLintGenerator;
