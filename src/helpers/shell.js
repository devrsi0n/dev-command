'use strict';

const shell = require('shelljs');

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
        console.log(`$ ${cmdStr}: ${stdout}`);
        resolve(stdout);
      } else {
        console.error(
          `$ ${cmdStr}: execute error, stderr: ${stderr}, code: ${code}, stdout: ${stdout}`
        );
        reject(stderr || code || stdout);
      }
    });
  });
}

module.exports = { exec };
