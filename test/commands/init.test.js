'use strict';

const { expect, test } = require('@oclif/test');
const path = require('path');

describe('init', () => {
  before(() => {
    process.chdir(path.resolve(__dirname, '../fixture/init'));
  });

  test
    .stdout({ print: true })
    .command(['init', '--type', 'editorconfig'])
    .it('runs init --type editorconfig', ctx => {
      // console.dir(ctx);
      expect(ctx.stdout).to.contain('Done');
    });
});
