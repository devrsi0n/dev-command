'use strict';

const Generator = require('./base');

class PrettierGenerator extends Generator {
  async writing() {
    const from = this.templatePath('.prettierrc.ejs');
    const to = this.destinationPath('.prettierrc');
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
    if (this.useYarn) {
      this.yarnInstall('prettier', { dev: true });
    } else {
      this.npmInstall('prettier', { saveDev: true });
    }
  }
}

module.exports = PrettierGenerator;
