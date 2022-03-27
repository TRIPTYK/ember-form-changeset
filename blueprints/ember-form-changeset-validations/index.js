module.exports = {
  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-changeset' },
      { name: 'ember-changeset-validations' },
    ]);
  },
};
