//const execa = require('execa');
const cp = require('child_process');
const fs = require('fs');

QUnit.module('generate', function() {
  const path = {
    test: '',
    validator: '',
    normal: {
      template: '/app/components/forms/testable/template.hbs',
      component: '/app/components/forms/testable/component.ts',
    },
    pods: {
      template: '/app/components/forms/testable/template.hbs',
      component: '/app/components/forms/testable/component.ts',
    },
  }
  QUnit.test('form no pods', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable']);
    assert.true(fs.existsSync(path.normal.template));
    assert.true(fs.existsSync(path.normal.component));
    assert.true(fs.existsSync(path.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form pods', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--pods']);
    assert.true(fs.existsSync(path.pods.template));
    assert.true(fs.existsSync(path.pods.component));
    assert.true(fs.existsSync(path.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form --ask', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--ask']);
    assert.true(fs.existsSync(path.normal.template));
    assert.true(fs.existsSync(path.normal.component));
    assert.true(fs.existsSync(path.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('reversability', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable']);
    assert.true(fs.existsSync(path.normal.template));
    assert.true(fs.existsSync(path.normal.component));
    assert.true(fs.existsSync(path.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
    assert.false(fs.existsSync(path.normal.template));
    assert.false(fs.existsSync(path.normal.component));
    assert.false(fs.existsSync(path.test));
    assert.false(fs.existsSync(path.validator));
  });
});
