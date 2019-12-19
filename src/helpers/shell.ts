import crossSpawn from 'cross-spawn';
import { SpawnOptions } from 'child_process';
// import debugFactory from 'debug';

// const debug = debugFactory('dev:shell');

/**
 * Execute shell command asynchronously
 * @param {string} cmdStr command string
 * @param {object} option any child_process.spawn option
 * @returns {Promise}
 */
export function exec(cmdStr: string, option: SpawnOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const [comand, ...args] = cmdStr.split(' ');
    const child = crossSpawn(comand, args, option);
    let output = '';
    let err = '';
    if (option.stdio !== 'inherit') {
      child.stdout.on('data', (data) => {
        output += data;
      });

      child.stderr.on('data', (data) => {
        err += data;
      });
    }
    child.on('exit', (code: number) => {
      if (code) {
        reject(err || code);
      } else {
        resolve(output);
      }
    })
  });
}

export function execSync(cmdStr: string, option = {}) {
  const [comand, ...args] = cmdStr.split(' ');
  return crossSpawn.sync(comand, args, option);
}
