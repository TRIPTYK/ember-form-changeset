//const execa = require('execa');
const cp = require('child_process');
const fs = require('fs');

QUnit.module('generate', function() {
  const path = {
    normal: {
      template: '',
      component: '',
      test: '',
      validator: '',
    },
    pods: {
      template: '',
      component: '',
      test: '',
      validator: '',
    },
  }
  QUnit.test('form no pods', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable']);
//    assert.true(fs.existsSync('../../app/components/forms/testable/template.hbs'));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form pods', async function(assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--pods']);
    assert.true(fs.existsSync('../../app/components/forms/testable/template.hbs'));
    assert.true(fs.existsSync('../../app/components/forms/testable/component.ts'));
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('form --ask', async function(_assert) {
    cp.exec('ember', ['generate', 'form', 'testable', '--ask']);
    cp.exec('ember', ['delete', 'form', 'testable']);
  });

  QUnit.test('reversability', async function(_assert) {
    cp.exec('ember', ['generate', 'form', 'testable']);
    cp.exec('ember', ['delete', 'form', 'testable']);
  });
});
