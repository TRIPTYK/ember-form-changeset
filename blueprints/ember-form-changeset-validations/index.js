module.exports = {
  afterInstall() {
    this.addPackagesToProject([
      { name: 'ember-changeset' },
      { name: 'ember-changeset-validations' },
    ]);
  },
};
