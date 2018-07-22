'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const { exec, execSync } = require('../helpers/shell');
const ora = require('ora');
const debug = require('debug')('dev-command');
const inquirer = require('inquirer');

const spinner = ora('Installing config file and dependencies\n');

class BaseGenerator extends Generator {
  constructor(...args) {
    super(...args);
    this.pjson = this.fs.readJSON('package.json');
    if (!this.pjson) throw new Error('not in a project directory');

    this.sourceRoot(path.join(__dirname, '../boilerplates'));
    this.inquirer = inquirer;
    this.debug = debug;
    this.spinner = spinner;
    this.exec = exec;
    this.useYarn = false;
    const { stdout } = execSync('yarn --version');
    if (/\d+.\d+.\d+/.test(stdout) && this.doesDstExists('yarn.lock')) {
      this.useYarn = true;
    }
    this.debug(`useYarn: ${this.useYarn}`);
  }

  doesDstExists($path) {
    return this.fs.exists(this.destinationPath($path));
  }

  install(pkgs, options) {
    if (this.useYarn) {
      this.yarnInstall(pkgs, { dev: true, ...options });
    } else {
      this.npmInstall(pkgs, { saveDev: true, ...options });
    }
  }

  copyBoilerplate(fromFileName, options) {
    const from = this.templatePath(fromFileName);
    const toFileName = fromFileName.slice(0, fromFileName.lastIndexOf('.'));
    const to = this.destinationPath(toFileName);
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, options || this);
  }

  extendPackage(extObj) {
    this.fs.extendJSON(this.destinationPath('package.json'), extObj);
  }
}

module.exports = BaseGenerator;