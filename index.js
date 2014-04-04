/*!
 * git-username <https://github.com/jonschlinkert/git-username>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT)
 */

const url = require('url');
const origin = require('remote-origin-url');


/**
 * Get the remote origin url for a local git repository
 */

var remoteOriginURL = origin.url().replace(/\.git$/, '');


/**
 * Get the repository name from the GitHub remote origin URL
 */

module.exports = (function() {
  return url.parse(remoteOriginURL).path.split('/')[0];
})();