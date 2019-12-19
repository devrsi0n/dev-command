import { Command, flags } from '@oclif/command';
import { createEnv } from 'yeoman-environment';
// import signale from 'signale';
import { prompt, Separator as Sep, PromptModule } from 'inquirer';
// import debugFactory from 'debug';
import { exec, execSync } from '../helpers/shell';

// const debug = debugFactory('dev:Command');

export default abstract class BaseCommand extends Command {
  // static flags = {
  //   loglevel: flags.string({ options: ['error', 'warn', 'info', 'debug'] }),
  // };

  prompt: PromptModule;
  Separator: typeof Sep;
  exec: typeof exec;
  execSync: typeof execSync;

  constructor(argv: string[], config: any) {
    super(argv, config);
    this.prompt = prompt;
    this.Separator = Sep;
    this.exec = exec;
    this.execSync = execSync;
    // Object.assign(this, signale);
    // this.debug = debug;
  }

  async generate(type, generatorOptions: object = {}) {
    const env = createEnv();

    env.register(require.resolve(`../generators/${type}`), `dev:${type}`);

    await new Promise((resolve, reject) => {
      env.run(`dev:${type}`, generatorOptions, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async init() {
    // @ts-ignore
    const parsed = this.parse(this.constructor);
    // @ts-ignore
    this.flags = parsed.flags;
  }
}
