'use strict';

const { Command, flags } = require('@oclif/command');
const { createEnv } = require('yeoman-environment');
const logSymbols = require('log-symbols');

class BaseCommand extends Command {
  // log(msg, level) {
  //   switch (this.flags.loglevel) {
  //     case 'error':
  //       if (level === 'error') console.error(msg);
  //       break;
  //     // a complete example would need to have all the levels
  //   }
  // }

  async generate(type, generatorOptions) {
    const env = createEnv();

    env.register(require.resolve(`./generators/${type}`), `dev:${type}`);

    await new Promise((resolve, reject) => {
      env.run(`dev:${type}`, generatorOptions, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  success(msg) {
    this.log(`${logSymbols.success} ${msg}`);
  }

  async init(err) {
    this.warn(`Init error: ${err}`);
    const parsed = this.parse(this.constructor);
    this.flags = parsed.flags;
  }

  async catch(err) {
    this.warn(`${logSymbols.warning} ${JSON.stringify(err, null, 2)}`);
  }

  // async finally(err) {}
}

BaseCommand.flags = {
  loglevel: flags.string({ options: ['error', 'warn', 'info', 'debug'] }),
};

module.exports = BaseCommand;
