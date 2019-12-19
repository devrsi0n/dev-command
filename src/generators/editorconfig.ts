import Generator from './base-generator';

class EditorConfigGenerator extends Generator {
  writing() {
    this.copyBoilerplate('.editorconfig.ejs');
  }
}

export default EditorConfigGenerator;
