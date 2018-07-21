'use strict';

const { flags: flag } = require('@oclif/command');
const BaseCommand = require('../base-command');

class InitCommand extends BaseCommand {
  async run() {
    const { prompt, Separator } = this;
    const { flags } = this.parse(InitCommand);
    let { type } = flags;
    if (!type) {
      const answer = await prompt({
        type: 'list',
        name: 'type',
        message: 'Boilerplate type',
        choices: [
          {
            name: 'create-react-app integrate with all linter',
            value: 'react',
          },
          new Separator(),
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
        await this.generate('eslint');
        break;
      }
      case 'prettier': {
        await this.generate('prettier');
        break;
      }
      case 'editorconfig': {
        await this.generate('editorconfig');
        break;
      }
      case 'commitlint': {
        await this.generate('commitlint');
        break;
      }
      default:
        throw new Error(`Unexpected boilerplate type: ${type}`);
    }
    this.success('Done');
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
