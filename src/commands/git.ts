import BaseCommand from './base-command';

class GitCommand extends BaseCommand {
  static args = [
    {
      name: 'log',
      required: false,
      description: 'Print pretty git log',
    },
  ];

  static description = `Useful git commands`;

  // static flags = {
  //   type: flag.string({
  //     char: 't',
  //     description: 'boilerplate type',
  //   }),
  // };

  static usage = 'git';
  static examples = ['$ dev git log'];

  async run() {
    const { args } = this.parse(GitCommand);
    if (args.log) {
      await this.exec(
        `git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --date=relative`,
        { stdio: 'inherit', shell: true }
      );
    }
  }
}

export default GitCommand;
