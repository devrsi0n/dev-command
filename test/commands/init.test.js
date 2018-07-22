'use strict';

const { expect, test } = require('@oclif/test');
const path = require('path');

process.chdir(path.resolve(__dirname, '../fixture'));

describe('init', () => {
  // test
  //   .stdout({ print: true })
  //   .command(['init', '--type', 'prettier'])
  //   .it('runs init --type prettier', ctx => {
  //     // console.dir(ctx);
  //     expect(ctx.stdout).to.contain('Done');
  //   });

  test
    .stdout({ print: true })
    .command(['init', '--type', 'editorconfig'])
    .it('runs init --type editorconfig', ctx => {
      // console.dir(ctx);
      expect(ctx.stdout).to.contain('Done');
    });
});
