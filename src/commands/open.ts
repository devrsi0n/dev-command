import { flags as flag } from '@oclif/command';
import opn from 'opn';
import fs from 'fs-extra';
import path from 'path';
import BaseCommand from './base-command';

const cwd = process.cwd();

// git@github.com:devrsi0n/dev-command.git
const sshGitRepoRE = /^git@([\w\.\-]+):([\w\.\-\/]+)\.git$/;
// https://github.com/devrsi0n/ononoki.gi
const httpGitRepoRE = /(^https?:\/\/[\w\.\-\/]+)\.git$/;

class OpenCommand extends BaseCommand {
  static flags = {
    npm: flag.boolean({
      default: false,
      char: 'n',
      description: "open lib's npm website",
    }),
    home: flag.boolean({
      default: false,
      char: 'h',
      description: "open lib's homepage",
    }),
  };

  static description = `Open lib's website in default browser, e.g. git repo, npm or homepage`;

  static usage = 'open';
  static examples = ['$ dev open', '$ dev open --npm'];

  async run() {
    const { flags } = this.parse(OpenCommand);
    const { npm, home } = flags;
    if (npm) {
      await this.openNpmWebsite();
    } else if (home) {
      await this.openHomepage();
    } else {
      await this.openGitWebsite();
    }
  }

  async openGitWebsite() {
    let url = '';
    try {
      url = await this.exec('git config --get remote.origin.url', {
        silent: true,
      });
    } catch (err) {
      // ignore
    }
    url = url.trim();
    if (!url) {
      const pkg = await this.getPackage();

      const { repository } = pkg;
      url = typeof repository === 'object' ? repository.url : repository;
    }
    if (!url) {
      this.warn('Not found git repo info in git config or package.json');
      this.exit(-1);
    }
    if (!url) {
      this.warn(
        `"${process.cwd()}" is not a git repo nor contains package.json`
      );
      return;
    }
    this.debug(`origin url: ${url}`);
    if (sshGitRepoRE.test(url)) {
      url = `https://${url.replace(sshGitRepoRE, '$1/$2')}`;
    } else if (httpGitRepoRE.test(url)) {
      url = url.replace(httpGitRepoRE, '$1');
    }

    await this.openURL(url);
  }

  async openNpmWebsite() {
    const { name } = await this.getPackage();

    const url = `https://www.npmjs.com/package/${name}`;
    await this.openURL(url);
  }

  async openHomepage() {
    const { homepage } = await this.getPackage();
    if (!homepage) {
      this.warn(`Homepage not exists`);
      this.exit(-1);
    }

    await this.openURL(homepage);
  }

  async getPackage() {
    const pkgPath = path.resolve(cwd, './package.json');
    if (!fs.existsSync(pkgPath)) {
      this.warn(`Not found package.json in cwd(${cwd})`);
      this.exit(-1);
    }
    return fs.readJSON(pkgPath);
  }

  async openURL(url: string) {
    try {
      this.debug(url);
      await opn(url, { wait: false });
    } catch (error) {
      this.error(`Open url(${url}) failed: ${JSON.stringify(error, null, 2)}`);
    }
  }
}

export default OpenCommand;
