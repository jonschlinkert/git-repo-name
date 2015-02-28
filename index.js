'use strict';

var url = require('url');
var chalk = require('chalk');
var origin = require('remote-origin-url');

module.exports = function repo(cwd, verbose) {
  var github = origin.sync(cwd);

  if (!github && verbose) {
    console.error(chalk.red('Can\'t find .git/config.'));
  }

  var parsed = url.parse(github);
  var res = '';

  if (parsed && parsed.path) {
    if (parsed.path.charAt(0) === '/') {
      parsed.path = parsed.path.slice(1);
    }
    res = parsed.path.replace(/\.git$/, '');
  }

  var i = res.indexOf('/');

  if (res.length && i !== -1) {
    return res.slice(i + 1);
  }

  return null;
};
