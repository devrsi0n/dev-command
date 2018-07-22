'use strict';

const Generator = require('./base-generator');

class EditorConfigGenerator extends Generator {
  writing() {
    this.copyBoilerplate('.editorconfig.ejs');
  }
}

module.exports = EditorConfigGenerator;
