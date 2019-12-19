import path from 'path';

import BaseCommand from './base-command';

class RunCommand extends BaseCommand {
  static description = `Run all kinds of CLI command`;
  static usage = 'run';
  static examples = ['$ dev run'];
  static args = [
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
      default: process.cwd(),
    },
  ];

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
        this.warn('Not support tool.');
        break;
    }
  }

  async runESLint(directory) {
    const cmd = `npx eslint --ext .jsx,.js --fix "${directory}" --ignore-pattern "node_modules"`;
    this.debug(`$ ${cmd}`);
    await this.exec(cmd);
  }

  async runPrettier(directory) {
    const dir = path.resolve(
      directory,
      './**/*.{js,jsx,ts,tsx,json,html,vue,css,scss,md,yml,flow}'
    );
    const cmd = `npx prettier --write "${dir}"`;
    this.debug(`$ ${cmd}`);
    await this.exec(cmd);
  }
}

export default RunCommand;
