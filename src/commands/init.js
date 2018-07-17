'use strict';

const path = require('path');
const { flags: flag } = require('@oclif/command');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const { renderTemplateFile } = require('template-file');
const ora = require('ora');

const { exec } = require('../helpers/shell');
const BaseCommand = require('../base');

const spinner = ora('Installing config file and dependencies\n');
const cwd = process.cwd();

class InitCommand extends BaseCommand {
  async run() {
    const { flags } = this.parse(InitCommand);
    let { type } = flags;
    if (!type) {
      const answer = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Boilerplate type',
        choices: [
          {
            name: 'create-react-app integrate with all linter',
            value: 'react',
          },
          new inquirer.Separator(),
          'ESLint',
          'prettier',
          'editorconfig',
          'commitlint',
        ],
      });
      type = answer.type; // eslint-disable-line
    }
    switch (type) {
      case 'ESLint': {
        const name = await this.askESLintConfig();
        spinner.start();
        await this.installESLint(name);
        break;
      }
      case 'prettier': {
        spinner.start();
        await this.installPrettier();
        break;
      }
      case 'editorconfig': {
        spinner.start();
        await this.installEditorconfig();
        break;
      }
      default:
        throw new Error(`Unexpected boilerplate type: ${type}`);
    }
    spinner.stop();
    this.success('Done');
  }

  async askESLintConfig() {
    const { name } = await inquirer.prompt({
      type: 'list',
      name: 'name',
      message: 'ESLint config',
      choices: [
        'eslint-config-airbnb-base',
        'eslint-config-airbnb',
        '@devrsi0n/eslint-config-base',
        new inquirer.Separator(),
        {
          name: 'Custom npm package',
          value: 'custom',
        },
      ],
      default: '@devrsi0n/eslint-config-base',
    });
    if (name === 'custom') {
      const { customName } = await inquirer.prompt({
        type: 'input',
        name: 'customName',
        message: 'Custom npm package name',
      });
      return customName;
    }
    return name;
  }

  async installESLint(configName) {
    await this.copyBoilerplate('eslint.json', '.eslintrc', { configName });
    await exec(`npm install -D ${configName}`);
    await exec(`npx install-peerdeps --dev ${configName}`);
    await exec(`npm install -D babel-eslint`);
  }

  async installPrettier() {
    await this.copyBoilerplate('prettier', '.prettierrc');
    await exec('npm install -D prettier');
  }

  async installEditorconfig() {
    // await this.copyBoilerplate('editorconfig', '.editorconfig');
    this.debug('Install .editorconfig');
    this.generate('editorconfig');
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
