'use strict';

const path = require('path');
const { Command, flags: flag } = require('@oclif/command');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const { renderTemplateFile } = require('template-file');
const { exec } = require('../helpers/shell');

const cwd = process.cwd();

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);
    let { type } = flags;
    if (!type) {
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Boilerplate type: ',
          choices: ['eslint', 'editorconfig', 'commitlint', 'react'],
        },
      ]);
      type = answer.type; // eslint-disable-line
    }
    switch (type) {
      case 'eslint': {
        const name = await this.askESLintConfig();
        await this.installESLint(name);
        break;
      }
      case 'editorconfig':
        await this.installEditorconfig();
        break;
      default:
        throw new Error(`Unexpected boilerplate type: ${type}`);
    }
  }

  async askESLintConfig() {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'ESLint config: ',
        choices: [
          'eslint-config-airbnb-base',
          'eslint-config-airbnb',
          '@devrsi0n/eslint-config-base',
        ],
        default: '@devrsi0n/eslint-config-base',
      },
    ]);
    return answer.name;
  }

  async installESLint(configName) {
    await this.copyBoilerplate('eslint.json', '.eslintrc', { configName });
    await exec(`npm install -D ${configName}`);
    await exec(`npx install-peerdeps --dev ${configName}`);
    await exec(`npm install -D babel-eslint`);
  }

  async installEditorconfig() {
    await this.copyBoilerplate('editorconfig', '.editorconfig');
  }

  async copyBoilerplate(srcName, dstName, data = {}) {
    const src = path.resolve(__dirname, '../boilerplates', srcName);
    const dst = path.resolve(cwd, dstName);
    const str = await renderTemplateFile(src, data);
    await fs.outputFile(dst, str);
  }
}

InitCommand.description = `Init boilerplates`;

InitCommand.flags = {
  type: flag.string({
    char: 't',
    description: 'boilerplate type',
  }),
};

InitCommand.usage = 'init';
InitCommand.examples = ['$ dev init', '$ dev init --type=react'];

module.exports = InitCommand;
