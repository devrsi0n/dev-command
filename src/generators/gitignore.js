'use strict';

const Generator = require('./base-generator');

class GitignoreGenerator extends Generator {
  writing() {
    this.copyBoilerplate('.gitignore.ejs');
  }
}

module.exports = GitignoreGenerator;
