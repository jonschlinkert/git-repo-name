/*!
 * git-repo-name <https://github.com/jonschlinkert/git-repo-name>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT)
 */

const url = require('url');
const origin = require('remote-origin-url');
const gitUrl = require('github-url-from-git');
const log = require('verbalize');

/**
 * Get the repository name from the GitHub remote origin URL
 */

module.exports = (function() {
  if (/\bhas not been defined\b/.test(origin.url())) {
    log.warn("  Can't calculate git-repo-name. This probably means that");
    log.warn("  a git remote origin has not been defined.");
    return '';
  }
  return url.parse(gitUrl(origin.url())).path.split('/')[2];
})();