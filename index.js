'use strict';

const url = require('url');
const path = require('path');
const origin = require('remote-origin-url');
const filename = require('file-name');

const repo = (options, cb) => {
  if (typeof options === 'function') {
    cb = options;
    options = process.cwd();
  }

  let promise = repo.promise(options);

  if (typeof cb === 'function') {
    promise.then(name => cb(null, name)).catch(cb);
    return;
  }

  return promise;
};

repo.promise = (options = {}) => {
  if (typeof options === 'string') {
    options = { cwd: options };
  }

  let opts = { cwd: process.cwd(), ...options };
  if (!opts.path) {
    opts.path = path.resolve(opts.cwd, '.git/config');
  }

  return new Promise((resolve, reject) => {
    origin(opts, (err, giturl) => {
      if (err) {
        reject(err);
        return;
      }

      if (!giturl) {
        reject(new Error('cannot find ".git/config"'));
        return;
      }

      let parsed = url.parse(giturl);
      let segments = parsed.pathname.split(path.sep);
      resolve(filename(segments.pop()));
    });
  });
};

repo.sync = (options = {}) => {
  if (typeof options === 'string') options = { cwd: options };
  let opts = { cwd: process.cwd(), ...options };
  if (!opts.path) {
    opts.path = path.resolve(opts.cwd, '.git/config');
  }

  let giturl = origin.sync(opts);
  if (!giturl) {
    throw new Error('cannot find ".git/config"');
  }
  let parsed = url.parse(giturl);
  let segments = parsed.pathname.split(path.sep);
  return filename(segments.pop());
};

module.exports = repo;
