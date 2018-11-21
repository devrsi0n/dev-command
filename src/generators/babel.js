'use strict';

const Generator = require('./base-generator');

class BabelGenerator extends Generator {
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
      const targets = {};
      if (this.browsers) {
        targets.browsers = ['last 2 versions', 'not ie <= 8'];
      }
      if (this.node) {
        targets.node = 'current';
      }
      content.preset.push(['env', { targets }]);
    }
    if (this.presetReact) {
      content.preset.push('react');
    }
    this.fs.writeJSON(this.destinationPath('.babelrc'), content, null, 2);
    const pkgs = [
      'babel-core',
      this.presetEnv && 'babel-preset-env',
      this.presetReact && 'babel-preset-react',
    ].filter(Boolean);
    if (pkgs.length) {
      await this.install(pkgs);
    }
  }
}

module.exports = BabelGenerator;
