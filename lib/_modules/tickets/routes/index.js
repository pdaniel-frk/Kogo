
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var logger  = require(LIBRARY_PATH + '/logger');
var http    = require('http');
var request = require('request');
var _       = require('underscore');
var ticketService = require('../services/tickets');

exports.getAll = function (req, res){

  //return res.send(200, [{'name' : 'tickets', 'status' : 'active'}]);

  logger.info('Request.' + req.url);

  var queryUrl = '/tickets' +
    '?fields[]=t.id&fields[]=t.name&fields[]=t.description' +
    '&fields[]=t.storyPoints&fields[]=t.statusId&fields[ts.name]=status' +
    '&fields[]=t.creatorId&fields[uc.username]=creator' +
    '&fields[]=t.assigneeId&fields[ua.username]=assignee' +
    '&joins[]=ticketStatus' +
    '&joins[]=creator' +
    '&joins[]=assignee';

  if (!_.isEmpty(req.query)) {
    var value = null;
    var conditions = [];
    for (var field in req.query) {
      value = req.query[field];
      if (_.isString(value)) {
        conditions.push('conditions[' + field + ']=' + value);
      }

      if (_.isArray(value)) {
        var subValue;
        var valid = true;
        for (var subIndex in value) {
          subValue = value[subIndex];
          if (!_.isString(subValue)) {
            valid = false;
          }
        }

        if (valid) {
          for (var subIndex in value) {
            subValue = value[subIndex];
            conditions.push('conditions[' + field + ']=' + subValue);
          }
        }
      }
    }

    queryUrl += '&' + conditions.join('&');
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
};

exports.update = function (req, res){
  logger.info('Request.' + req.url);

  var queryUrl = '/tickets/' + req.params.ticketId;

  var options = {
      url: 'http://localhost:3001' + queryUrl,
      body: req.body,
      json: true,
      method: 'put'
  };

  request(options, function (error, response, body){
    return res.json(200, body);
  });
};

/**
 * Method returns ticket completion statistics.
 * Sample output:
 * {
 *
 * }
 *
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getCompletionStatistics = function (req, res){

  logger.info('Request.' + req.url);

  var ticketService = new TicketService();

};
