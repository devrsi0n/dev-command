'use strict';

const Generator = require('./base-generator');

class LicenseGenerator extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-license'));
  }
}

module.exports = LicenseGenerator;
