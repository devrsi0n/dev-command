'use strict';

const path = require('path');
const Generator = require('yeoman-generator');

class BaseGenerator extends Generator {
  constructor(...args) {
    super(...args);
    this.pjson = this.fs.readJSON('package.json');
    if (!this.pjson) throw new Error('not in a project directory');

    this.sourceRoot(path.join(__dirname, '../boilerplates'));
  }
}

module.exports = BaseGenerator;
