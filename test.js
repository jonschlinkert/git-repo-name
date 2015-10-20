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

describe('dir', function() {
  it('should work fine with dir argument in async mode', function(done) {
    repoName('.', function (err, res) {
      if (err) return done(err);
      assert(repoName.sync() === 'git-repo-name');
      done();
    });
  });
  
  it('should work fine with dir argument in sync mode', function() {
    assert(repoName.sync('.') === 'git-repo-name');
  });
  
  it('should return error .git folder don\'t exists', function(done) {
    repoName('docs', function (err, res) {
      assert.equal(err.message, 'cannot find ".git/config"');
      done();
    });
  });
});
