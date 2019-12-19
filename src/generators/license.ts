import Generator from './base-generator';

class LicenseGenerator extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-license'), {});
  }
}

export default LicenseGenerator;
