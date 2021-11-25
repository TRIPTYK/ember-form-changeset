/* eslint-disable no-undef */

//const execa = require('execa');
const cp = require('child_process');
const fs = require('fs');

QUnit.module('generate', function () {
  const path = {
    validator: 'app/addon/validator/testable.ts',
    normal: {
      template: 'app/addon/template/component/testale.hbs',
      component: 'app/addon/addon/components/testable.ts',
      test: 'app/tests/integration/components/components/testable-test.ts',
    },
    pods: {
      template: '/app/addon/pods/components/testable/template.hbs',
      component: '/app/addon/pods/components/testable/component.ts',
      test: 'app/tests/integration/components/testable-test.ts',
    },
  };
  QUnit.test('form no pods', async function (assert) {
    await Promise.all([cp.exec('ember', ['generate', 'form', 'testable'])]);
    assert.true(fs.existsSync(path.normal.template));
    assert.true(fs.existsSync(path.normal.component));
    assert.true(fs.existsSync(path.normal.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form pods', function (assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--pods']);
    assert.true(fs.existsSync(path.pods.template));
    assert.true(fs.existsSync(path.pods.component));
    assert.true(fs.existsSync(path.pods.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form --ask', function (assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--ask']);
    assert.true(fs.existsSync(path.normal.template));
    assert.true(fs.existsSync(path.normal.component));
    assert.true(fs.existsSync(path.normal.test));
    assert.true(fs.existsSync(path.validator));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });
});
