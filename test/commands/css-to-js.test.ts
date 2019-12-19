import { expect, test } from '@oclif/test';
import path from 'path';

describe('css-to-js', () => {
  before(() => {
    process.chdir(path.resolve(__dirname, '../fixture/css-to-js'));
  });

  test
    .stdout({ print: true })
    .command(['css-to-js'])
    .it('convert ok', ctx => {
      expect(ctx.stdout).to.contain('test.css');
    });
});
