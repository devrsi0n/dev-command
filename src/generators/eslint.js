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
        '@devrsi0n/eslint-config-base',
        '@devrsi0n/eslint-config-react',
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
    const from = this.templatePath('.eslintrc.ejs');
    const to = this.destinationPath('.eslintrc');
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, { configName });
    await this.install(configName);
    await this.install(`babel-eslint`);
    await this.exec(`npx install-peerdeps --dev ${configName}`);
    this.spinner.stop();
    this.fs.extendJSON(this.destinationPath('package.json'), {
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
