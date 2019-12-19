import Generator from './base-generator';

class BabelGenerator extends Generator {
  presetEnv: boolean;
  presetReact: boolean;
  browsers: boolean;
  node: boolean;

  async prompting() {
    const { presets } = await this.prompt({
      type: 'checkbox',
      name: 'presets',
      message: 'Babel config',
      choices: ['babel-preset-env', 'babel-preset-react'],
      default: ['babel-preset-env'],
    });
    this.presetEnv = false;
    this.presetReact = false;
    // TODO: add babel@7
    if (presets.includes('babel-preset-env')) {
      this.presetEnv = true;
      const { targets } = await this.prompt({
        type: 'checkbox',
        name: 'targets',
        choices: [
          {
            name: 'browsers: ["last 2 versions", "not ie <= 8"]',
            value: 'browsers',
          },
          {
            name: 'node: "current"',
            value: 'node',
          },
        ],
        message: 'babel-preset-env targets',
        default: ['browsers'],
      });
      this.browsers = targets.includes('browsers');
      this.node = targets.includes('node');
    }
    if (presets.includes('babel-preset-react')) {
      this.presetReact = true;
    }
  }

  async writing() {
    // TODO: stage presets
    const content = {
      presets: [],
    };
    if (this.presetEnv) {
      const targets: {browsers?:string[], node?:string} = {};
      if (this.browsers) {
        targets.browsers = ['last 2 versions', 'not ie <= 8'];
      }
      if (this.node) {
        targets.node = 'current';
      }
      content.presets.push(['env', { targets }]);
    }
    if (this.presetReact) {
      content.presets.push('react');
    }
    this.fs.writeJSON(this.destinationPath('.babelrc'), content, null, 2);
    this.extendPackage({
      scripts: {
        babel: 'babel src --out-dir lib --copy-files',
      },
    });
    const pkgs = [
      'babel-cli',
      'babel-core',
      this.presetEnv && 'babel-preset-env',
      this.presetReact && 'babel-preset-react',
    ].filter(Boolean);
    await this.install(pkgs);
  }
}

export default BabelGenerator;
