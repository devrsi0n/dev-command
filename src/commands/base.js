'use strict';

const { Command, flags } = require('@oclif/command');
const { createEnv } = require('yeoman-environment');
const logSymbols = require('log-symbols');
const inquirer = require('inquirer');

class BaseCommand extends Command {
  constructor(...args) {
    super(...args);
    this.inquirer = inquirer;
  }

  async generate(type, generatorOptions) {
    const env = createEnv();

    env.register(require.resolve(`../generators/${type}`), `dev:${type}`);

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

  async init() {
    const parsed = this.parse(this.constructor);
    this.flags = parsed.flags;
  }

  async catch(err) {
    this.warn(`${JSON.stringify(err, null, 2)}`);
  }
}

BaseCommand.flags = {
  loglevel: flags.string({ options: ['error', 'warn', 'info', 'debug'] }),
};

module.exports = BaseCommand;
