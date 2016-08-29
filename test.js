'use strict';

require('mocha');
var assert = require('assert');
var slackUsers = require('./');

describe('slack-users', function() {
  it('should export a function', function() {
    assert.equal(typeof slackUsers, 'function');
  });

  it('should return an error when the team is not specified', function(cb) {
    slackUsers({}, function(err) {
      if (!err) return cb(new Error('expected an error'));
      try {
        assert.equal(err.message, 'Invalid "team" option.');
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  it('should return an error when the token is not specified', function(cb) {
    slackUsers({team: 'assemblejs'}, function(err) {
      if (!err) return cb(new Error('expected an error'));
      try {
        assert.equal(err.message, 'Invalid "token" option.');
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  it('should return an error when the token is invalid', function(cb) {
    slackUsers({team: 'assemblejs', token: 'a'}, function(err) {
      if (!err) return cb(new Error('expected an error'));
      try {
        assert.equal(err.message, 'invalid_auth');
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });
});
