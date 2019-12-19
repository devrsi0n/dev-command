import path from 'path';
import Generator from 'yeoman-generator';
import ora from 'ora';
import debugFactory from 'debug';
const debug = debugFactory('dev:Generator');
import inquirer from 'inquirer';
import signale from 'signale';
import { exec, execSync } from '../helpers/shell';

const spinner = ora('Installing config file and dependencies\n');

class BaseGenerator extends Generator {
  pjson: object;
  inquirer: typeof inquirer;
  debug: typeof debug;
  spinner: typeof spinner;
  exec: typeof exec;
  useYarn: boolean;

  constructor(args: string | string[], options: {}) {
    super(args, options);
    this.pjson = this.fs.readJSON('package.json');
    if (!this.pjson) {
      throw new Error('not in a JavaScript project directory');
    }

    this.sourceRoot(path.join(__dirname, '../boilerplates'));
    this.inquirer = inquirer;
    Object.assign(this, signale);
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

  doesDstExists($path: string) {
    return this.fs.exists(this.destinationPath($path));
  }

  async install(pkgs: string | string[], options = {}) {
    if (this.useYarn) {
      this.yarnInstall(pkgs, { dev: true, ...options });
    } else {
      this.npmInstall(pkgs, { saveDev: true, ...options });
    }
  }

  copyBoilerplate(fromFileName: string, options = {}) {
    const from = this.templatePath(fromFileName);
    const toFileName = fromFileName.slice(0, fromFileName.lastIndexOf('.'));
    const to = this.destinationPath(toFileName);
    this.debug(`from: ${from}, to: ${to}`);
    this.fs.copyTpl(from, to, options || this);
  }

  extendPackage(extObj = {}) {
    this.fs.extendJSON(this.destinationPath('package.json'), extObj);
  }
}

export default BaseGenerator;
