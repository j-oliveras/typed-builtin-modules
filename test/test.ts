/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');

function tests(title: string, imported: Array<string>) {
  test(`${title} is array`, t => {
    t.true(Array.isArray(imported));
  }).
  end();

  test(`${title} all items are strings`, t => {
    t.true(imported.reduce((previous, current) => {
      return previous && (typeof current === 'string');
    }, true));
  }).
  end();

  // **************************************************
  // The following tests are most likely tests
  // for the module itself instead of the typing.
  // **************************************************

  test(`${title} contains 'crypto', 'fs', 'http' and 'path'`, t => {
    t.true(imported.indexOf('crypto') !== -1);
    t.true(imported.indexOf('fs') !== -1);
    t.true(imported.indexOf('http') !== -1);
    t.true(imported.indexOf('path') !== -1);
  }).
  end();

  test(`${title} try import all modules`, t => {
    t.doesNotThrow(() => imported.forEach(x => require(x)));
  }).
  end();
}

import builtinModules = require('builtin-modules');
tests('import builtin-modules', builtinModules);

import builtinModulesStatic = require('builtin-modules/static');
tests('import builtin-modules/static', builtinModulesStatic);
