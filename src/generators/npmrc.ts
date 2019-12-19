import Generator from './base-generator';

class NpmrcGenerator extends Generator {
  configs: string[];

  async prompting() {
    const { configs } = await this.prompt({
      type: 'checkbox',
      name: 'configs',
      message: '.npmrc configurations',
      choices: ['package-lock=false', 'registry'],
      default: ['package-lock=false'],
    });

    this.configs = [];
    if (configs.includes('package-lock=false')) {
      this.configs.push('package-lock=false');
    }

    if (configs.includes('registry')) {
      const { registry } = await this.prompt({
        type: 'list',
        name: 'registry',
        message: 'NPM registry',
        choices: [
          ...this.getRegistryList(),
          new this.inquirer.Separator(),
          {
            name: 'Custom npm registry',
            value: 'custom',
          },
        ],
      });
      if (registry === 'custom') {
        const { customRegistry } = await this.prompt({
          type: 'input',
          name: 'customRegistry',
          message: 'Custom npm registry url',
        });
        this.configs.push(`registry=${customRegistry}`);
      } else {
        this.configs.push(`registry=${registry}`);
      }
    }
  }

  getRegistryList() {
    return [
      'https://registry.npm.taobao.org',
      'https://registry.npmjs.org/',
      'https://registry.yarnpkg.com',
    ];
  }

  writing() {
    this.fs.write('.npmrc', `${this.configs.join('\n')}\n`);
  }
}

export default NpmrcGenerator;
