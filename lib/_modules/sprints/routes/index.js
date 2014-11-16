
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

  var queryUrl = '/sprints';

  if (!_.isEmpty(req.query)) {
    var value = null;
    var conditions = [];
    for (var field in req.query) {
      value = req.query[field];
      if (_.isString(value)) {
        conditions.push('conditions[' + field + ']=' + value);
      }
    }

    queryUrl += '?' + conditions.join('&');
  }

  var options = {
    host: 'localhost',
    port: 3001,
    path: queryUrl
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

  // var boardsService = new BoardsService();
  // boardsService.all(req.query, function (error, boards) {
  //   if (error) return res.json(500, 'Internal Server Error');
  //   if (boards == null) boards = {};
  //   return res.json(200, boards);
  // });
};
