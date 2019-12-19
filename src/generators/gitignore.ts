import Generator from './base-generator';

class GitignoreGenerator extends Generator {
  writing() {
    this.copyBoilerplate('.gitignore.ejs');
  }
}

export default GitignoreGenerator;
