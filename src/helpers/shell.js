'use strict';

const shell = require('shelljs');
const debug = require('debug')('dev:shell');

/**
 * Execute shell command asynchronously
 * @param {string} cmdStr command string
 * @param {object} option any child_process.spawn option
 * @returns {Promise}
 */
function exec(cmdStr, option = {}) {
  return new Promise((resolve, reject) => {
    shell.exec(cmdStr, { ...option }, (code, stdout, stderr) => {
      if (!code) {
        debug(`$ ${cmdStr}: ${stdout}`);
        resolve(stdout);
      } else {
        debug(
          `$ ${cmdStr}: execute error, stderr: ${stderr}, code: ${code}, stdout: ${stdout}`
        );
        reject(stderr || code || stdout);
      }
    });
  });
}

function execSync(cmdStr, option = {}) {
  return shell.exec(cmdStr, { ...option, silent: true, async: false });
}

module.exports = { exec, execSync };
