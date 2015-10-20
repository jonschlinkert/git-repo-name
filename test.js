'use strict';

require('mocha');
var assert = require('assert');
var repoName = require('./');

describe('async', function () {
  it('should return the name from git config:', function (done) {
    repoName(function (err, res) {
      if (err) return done(err);
      assert(res === 'git-repo-name');
      done();
    });
  });
});

describe('sync', function () {
  it('should return the name from git config:', function () {
    assert(repoName.sync() === 'git-repo-name');
  });
});
