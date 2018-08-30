'use strict';

const { expect, test } = require('@oclif/test');
const path = require('path');

describe('css-to-js', () => {
  before(() => {
    process.chdir(path.resolve(__dirname, '../fixture/css-to-js'));
  });

  test
    .stdout({ print: true })
    .command(['css-to-js'])
    .it('convert ok', ctx => {
      // console.dir(ctx);
      expect(ctx.stdout).to.contain('test.css');
    });
});
