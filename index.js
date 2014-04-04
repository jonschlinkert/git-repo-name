/*!
 * git-username <https://github.com/jonschlinkert/git-username>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT)
 */

const url = require('url');
const origin = require('remote-origin-url');
const gitUrl = require('github-url-from-git');


/**
 * Get the repository name from the GitHub remote origin URL
 */

module.exports = (function() {
  return url.parse(gitUrl(origin.url())).path.split('/')[2];
})();