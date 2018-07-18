'use strict';

const Generator = require('./base');
const debug = require('debug')('dev-command');

class CommitlintGenerator extends Generator {
  writing() {
    const from = this.templatePath('.commitlintrc.js.ejs');
    const to = this.destinationPath('.commitlintrc.js');
    debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
    this.install(['@commitlint/cli', '@commitlint/config-angular']);
    this.fs.extendJSON(this.destinationPath('package.json'), {
      scripts: {
        ...this.pjson.scripts,
        commitmsg: 'commitlint -E GIT_PARAMS',
      },
    });
  }
}

module.exports = CommitlintGenerator;
