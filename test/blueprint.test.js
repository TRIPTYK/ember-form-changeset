const { execSync } = require('child_process');
const fs = require('fs');

QUnit.module('generate');

const path = {
  validator: './addon/validator/testable.ts',
  normal: {
    template: './addon/templates/components/testable.hbs',
    component: './addon/components/testable.ts',
    test: './tests/integration/components/components/testable-test.ts',
  },
  pods: {
    template: './addon/pods/components/testable/template.hbs',
    component: './addon/pods/components/testable/component.ts',
    test: './tests/integration/components/testable-test.ts',
  },
};

QUnit.test('form no args', async function (assert) {
  execSync('ember generate form testable');
  await Promise.all([
    assert.true(fs.existsSync(path.normal.template), 'template generation'),
    assert.true(fs.existsSync(path.normal.component), 'component generation'),
    assert.true(fs.existsSync(path.normal.test), 'test generation'),
    assert.true(fs.existsSync(path.validator), 'validator generation'),
  ]);
  execSync('ember d form testable');
});

QUnit.test('form pods', async function (assert) {
  execSync('ember generate form testable --pods');
  await Promise.all([
    assert.true(fs.existsSync(path.pods.template), 'template generation'),
    assert.true(fs.existsSync(path.pods.component), 'component generation'),
    assert.true(fs.existsSync(path.pods.test), 'test generation'),
    assert.true(fs.existsSync(path.validator), 'validator generation'),
  ]);
  execSync('ember d form testable --pods');
});

QUnit.test('form --ask', function (assert) {
  assert.expect(0);
  //execSync('ember generate form testable --ask');
  //assert.true(fs.existsSync(path.normal.template), 'template generation');
  //assert.true(fs.existsSync(path.normal.component), 'component generation');
  //assert.true(fs.existsSync(path.normal.test), 'test generation');
  //assert.true(fs.existsSync(path.validator));
  //execSync('ember d form testable');
});

QUnit.test('reversability', async function (assert) {
  execSync('ember generate form testable');
  await Promise.all([
    assert.true(fs.existsSync(path.normal.template), 'template generation'),
    assert.true(fs.existsSync(path.normal.component), 'component generation'),
    assert.true(fs.existsSync(path.normal.test), 'test generation'),
    assert.true(fs.existsSync(path.validator), 'validator generation'),
  ]);
  execSync('ember d form testable');
  await Promise.all([
    assert.false(fs.existsSync(path.normal.template), 'delete template'),
    assert.false(fs.existsSync(path.normal.component), 'delete component'),
    assert.false(fs.existsSync(path.test), 'delete test'),
    assert.false(fs.existsSync(path.validator), 'delete validator'),
  ]);
});
