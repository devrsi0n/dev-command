import { flags as flag } from '@oclif/command';
import BaseCommand from './base-command';

class InitCommand extends BaseCommand {
  static flags = {
    type: flag.string({
      char: 't',
      description: 'boilerplate type',
    }),
  };

  static description = `Init boilerplates`;
  static usage = 'init';
  static examples = ['$ dev init', '$ dev init --type=react'];

  async run() {
    const { prompt } = this;
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
          {
            name: '.npmrc',
            value: 'npmrc',
          },
          'babel',
          'editorconfig',
          'license',
          'gitignore',
          // new Separator(),
          // {
          //   name: 'create-react-app integrate with all linter',
          //   value: 'react',
          // },
        ],
      });
      type = answer.type; // eslint-disable-line
    }
    await this.generate(type);
  }
}

export default InitCommand;
