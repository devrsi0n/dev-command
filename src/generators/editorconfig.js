'use strict';

const Generator = require('./base-generator');
const debug = require('debug')('dev-command');

class EditorConfigGenerator extends Generator {
  writing() {
    const from = this.templatePath('.editorconfig.ejs');
    const to = this.destinationPath('.editorconfig');
    debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
  }
}

module.exports = EditorConfigGenerator;
