'use strict';

// const { flags: flag } = require('@oclif/command');
const path = require('path');
const BaseCommand = require('./base-command');

class RunCommand extends BaseCommand {
  async run() {
    const { args } = this.parse(RunCommand);
    const { tool, directory } = args;
    switch (tool) {
      case 'eslint':
        await this.runESLint(directory);
        break;
      case 'prettier':
        await this.runPrettier(directory);
        break;
      default:
        break;
    }
  }

  async runESLint(directory) {
    const cmd = `npx eslint --ext .jsx,.js --fix "${directory}"`;
    this.info(`$ ${cmd}`);
    await this.exec(cmd);
  }

  async runPrettier(directory) {
    const dir = path.resolve(
      directory,
      './**/*.{js,jsx,ts,tsx,json,html,vue,css,scss,md,yml,flow}'
    );
    const cmd = `npx prettier --write "${dir}"`;
    this.info(`$ ${cmd}`);
    await this.exec(cmd);
  }
}

RunCommand.args = [
  {
    name: 'tool',
    required: true,
    description: 'tool name to run',
    default: 'eslint',
    options: ['eslint', 'prettier', 'commitlint'],
  },
  {
    name: 'directory',
    required: false,
    description: 'target directory',
    default: 'src',
  },
];

RunCommand.description = `Run all kinds of CLI command`;
RunCommand.usage = 'run';
RunCommand.examples = ['$ dev run'];

module.exports = RunCommand;
