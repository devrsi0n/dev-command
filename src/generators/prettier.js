'use strict';

const Generator = require('./base');

class PrettierGenerator extends Generator {
  async writing() {
    const from = this.templatePath('.prettierrc.ejs');
    const to = this.destinationPath('.prettierrc');
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
    this.install('prettier');
  }
}

module.exports = PrettierGenerator;
