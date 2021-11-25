const { execa } = require('execa');
//const fs = require('fs/promises');

QUnit.module('generate', function() {
  QUnit.test('form no ask no pods', function(assert) {
    execa('ember', ['generate', 'form', 'testable'])
  });
});
