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
            name: 'ESLint',
            value: 'eslint',
          },
          'prettier',
          'commitlint',
          'babel',
          'editorconfig',
          'gitignore',
          new Separator(),
          {
            name: 'create-react-app integrate with all linter',
            value: 'react',
          },
        ],
      });
      type = answer.type; // eslint-disable-line
    }
    await this.generate(type);
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
