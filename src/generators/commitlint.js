'use strict';

const Generator = require('./base-generator');

class CommitlintGenerator extends Generator {
  async prompting() {
    const { name } = await this.prompt({
      type: 'list',
      name: 'name',
      message: 'Commitlint config',
      choices: [
        '@commitlint/config-conventional',
        '@commitlint/config-angular',
        '@commitlint/config-lerna-scopes',
        '@commitlint/config-patternplate',
        new this.inquirer.Separator(),
        {
          name: 'Custom npm package',
          value: 'custom',
        },
      ],
      default: '@commitlint/config-conventional',
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
    this.copyBoilerplate('.commitlintrc.js.ejs');
    await this.install(this._getPackages());
    this.extendPackage({
      husky: {
        hooks: {
          'commit-msg': 'commitlint -E GIT_PARAMS',
        },
      },
    });
  }

  _getPackages() {
    return ['husky', '@commitlint/cli', this.configName];
  }
}

module.exports = CommitlintGenerator;
