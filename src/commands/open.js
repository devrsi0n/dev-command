'use strict';

const opn = require('opn');
const fs = require('fs-extra');
const BaseCommand = require('./base-command');

// git@github.com:devrsi0n/dev-command.git
const sshGitRepoRE = /^git@([\w\.\-]+):([\w\.\-\/]+)\.git$/;
// https://github.com/devrsi0n/ononoki.gi
const httpGitRepoRE = /(^https?:\/\/[\w\.\-\/]+)\.git$/;

class OpenCommand extends BaseCommand {
  async run() {
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
      const pkg = await fs.readJSON('package.json');
      const { repository, homepage } = pkg;
      const repo = typeof repository === 'object' ? repository.url : repository;
      url = repo || homepage;
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
    try {
      this.info(url);
      await opn(url, { wait: false });
    } catch (error) {
      this.error(`Open url(${url}) failed: ${JSON.stringify(error, null, 2)}`);
      return;
    }

    this.success('Done');
  }
}

OpenCommand.description = `Open code repo in default browser`;

OpenCommand.usage = 'open';
OpenCommand.examples = ['$ dev open'];

module.exports = OpenCommand;
