module.exports = {
  normalizeEntityName() {},
  afterInstall() {
    return this.addPackagesToProject([
      { name: 'ember-changeset' },
      { name: 'ember-changeset-validations' },
    ]);
  },
};
