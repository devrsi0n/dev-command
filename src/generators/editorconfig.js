'use strict';

const Generator = require('./base');
const debug = require('debug')('generators');

class EditorConfigGenerator extends Generator {
  writing() {
    const to = this.destinationPath('.editorconfig');
    const from = this.templatePath('.editorconfig.ejs');
    debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, {});
  }
}

module.exports = EditorConfigGenerator;
