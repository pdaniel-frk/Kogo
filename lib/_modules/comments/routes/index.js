
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var logger  = require(LIBRARY_PATH + '/logger');
var http    = require('http');
var _       = require('underscore');
var request = require('request');

exports.getAll = function (req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '';

  if (!_.isEmpty(req.query)) {
    var value = null;
    var conditions = [];
    for (var field in req.query) {
      value = req.query[field];
      if (_.isString(value)) {
        conditions.push('conditions[' + field + ']=' + value);
      }
    }

    queryUrl += '&' + conditions.join('&');
  }

  var options = {
    host: 'localhost',
    port: 3001,
    path: '/comments' +
          '?fields[]=c.id&fields[]=c.text&fields[]=c.userId' +
          '&fields[]=c.createdAt&fields[]=c.ticketId' +
          '&fields[]=c.status&fields[]=c.updatedAt' +
          '&fields[t.name]=ticket' +
          '&fields[u.username]=user&fields[u.avatar]=userAvatar' +
          '&joins[]=user' +
          '&joins[]=ticket' + queryUrl
  };

  http.get(options, function (response){
    response.setEncoding('utf-8');

    var responseString = '';

    response.on('data', function (data) {
      responseString += data;
    });

    response.on('end', function () {
      res.status(200).send(responseString);
    });

  }).on('error', function (e){
    return res.json(500, 'Internal Server Error');
  });
};
