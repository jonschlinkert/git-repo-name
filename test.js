'use strict';

require('mocha');
const assert = require('assert');
const repoName = require('./');

describe('git-repo-name', () => {
  describe('async', () => {
    it('should return a promise', async() => {
      assert.equal(await repoName(), 'git-repo-name');
    });

    it('should take a callback', cb => {
      repoName((err, res) => {
        if (err) return cb(err);
        assert.equal(res, 'git-repo-name');
        cb();
      });
    });

    it('should take cwd as a string', cb => {
      repoName(process.cwd(), (err, res) => {
        if (err) return cb(err);
        assert.equal(repoName.sync(), 'git-repo-name');
        cb();
      });
    });

    it('should error when .git folder does not exist', cb => {
      repoName('foo', (err, res) => {
        assert.equal(err.message, 'cannot find ".git/config"');
        cb();
      });
    });
  });

  describe('sync', () => {
    it('should return the name from git config:', () => {
      assert.equal(repoName.sync(), 'git-repo-name');
    });

    it('should take cwd as a string', () => {
      assert.equal(repoName.sync('.'), 'git-repo-name');
    });
  });
});
