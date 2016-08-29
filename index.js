'use strict';

var extend = require('extend-shallow');
var get = require('simple-get');

/**
 * Get the slack users for the specified team.
 *
 * ```js
 * var options = {
 *   team: 'my-slack-team',
 *   token: 'my-slack-token'
 * };
 * slackUsers(options, function(err, users) {
 *   if (err) return console.error(err);
 *   console.log(users);
 *   //=> [
 *   //=>   {id: '', name: 'doowb', ...},
 *   //=>   {id: 'USLACKBOT', name: 'slackbot', ...}
 *   //=> ]
 * });
 * ```
 *
 * @param  {Object} `options` Options object used for getting users.
 * @param {String} `options.team` Name of slack team to get users from.
 * @param {String} `optins.token` Slack token to use when getting users.
 * @param  {Function} `cb` Callback functions passing an error if one occurs or an array of users when successful.
 * @api public
 */

module.exports = function slackUsers(options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({}, options);
  var team = opts.team;
  var token = opts.token;

  if (!team) {
    return cb(new Error('Invalid "team" option.'));
  }

  if (!token) {
    return cb(new Error('Invalid "token" option.'));
  }

  get.concat({url: url(team, token), json: true}, function(err, res, data) {
    if (err || (res && res.statusCode !== 200)) {
      return cb(err);
    }
    if (data.ok === false) {
      return cb(new Error(data.error));
    }
    cb(null, data.members);
  });
};

function url(team, token) {
  return 'https://' + team + '.slack.com/api/users.list?token=' + token + '&presence=1';
}
