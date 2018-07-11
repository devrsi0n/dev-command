'use strict';

const { Command, flags: flag } = require('@oclif/command');

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);
    this.log(`types ${flags.type}`);
  }
}

InitCommand.description = `Init boilerplates or lint files`;

InitCommand.flags = {
  type: flag.string({
    char: 't',
    description: 'boilerplate type',
  }),
};

InitCommand.usage = 'init';
InitCommand.examples = ['$ dev init', '$ dev init --type=react'];

module.exports = InitCommand;
