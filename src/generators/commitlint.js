'use strict';

const Generator = require('./base-generator');
const debug = require('debug')('dev-command');

class CommitlintGenerator extends Generator {
  async prompting() {
    const { name } = await this.prompt({
      type: 'list',
      name: 'name',
      message: 'Commitlint config',
      choices: [
        '@commitlint/config-angular',
        '@commitlint/config-conventional',
        '@commitlint/config-lerna-scopes',
        '@commitlint/config-patternplate',
        new this.inquirer.Separator(),
        {
          name: 'Custom npm package',
          value: 'custom',
        },
      ],
      default: '@commitlint/config-angular',
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

  writing() {
    const { configName } = this;
    const from = this.templatePath('.commitlintrc.js.ejs');
    const to = this.destinationPath('.commitlintrc.js');
    debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, { configName });
    this.install(['@commitlint/cli', '@commitlint/config-angular']);
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        commitmsg: 'commitlint -E GIT_PARAMS',
      },
    });
  }
}

module.exports = CommitlintGenerator;
