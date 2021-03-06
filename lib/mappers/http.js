
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var Mapper       = require('./index');
var Model        = require('../models');
var util         = require('util');
var qs           = require('qs');
var _            = require('underscore');
var Exception    = require(LIBRARY_PATH + '/exception');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Class definition
 */
function Http(httpClient) {
  if (httpClient) {
    this.httpClient = httpClient;
  }
};

/**
 * Http extends Mapper
 */
util.inherits(Http, Mapper);

/**
 * Placeholder for HTTP client
 */
Http.prototype.httpClient;

/**
 * Method returns HTTP client details
 */
Http.prototype.getHttpClient = function () {
  if (!this.httpClient) {
    var HTTP = require("q-io/http");
    var configuration = require('../configuration');
    HTTP.config = configuration.get('cerberus-api');
    this.httpClient = HTTP;
  }

  return this.httpClient;
}

/**
 * Method sends GET HTTP request
 */
Http.prototype.sendGetRequest = function (queryBuilder) {

  if (!(queryBuilder instanceof QueryBuilder)) {
    throw new Exception('Invalid query builder passed. Instance of QueryBuilder expected');
  }

  var HttpClient = this.getHttpClient();

  var queryString = qs.stringify(queryBuilder.toArray(), { indices: false });

  var requestObject = _.extend({}, HttpClient.config);
  requestObject.path = this.apiUrl;
  requestObject.method = 'GET';

  if (queryString) {
    requestObject.path += '?' + queryString;
  }

  return HttpClient.request(requestObject)
    .then(function (response){
      return response.body.read();
    }).then(function (buffer){
      return JSON.parse(buffer.toString());
    });
}

/**
 * Method sends POST HTTP request
 */
Http.prototype.sendPostRequest = function (entity) {

  if (!(entity instanceof Model)) {
    throw new Exception('Invalid model passed. Instance of Model expected');
  }

  var HttpClient = this.getHttpClient();

  var requestObject = _.extend({}, HttpClient.config);
  requestObject.path = this.apiUrl;
  requestObject.method = 'POST';
  requestObject.body = [JSON.stringify(entity)];

  return HttpClient.request(requestObject)
    .then(function (response){
      return response.body.read();
    }).then(function (buffer){
      return JSON.parse(buffer.toString());
    });
}

/**
 * Method sends PUT HTTP request
 */
Http.prototype.sendPutRequest = function (entity) {

  if (!(entity instanceof Model)) {
    throw new Exception('Invalid model passed. Instance of Model expected');
  }

  var HttpClient = this.getHttpClient();

  var requestObject = _.extend({}, HttpClient.config);
  requestObject.path = this.apiUrl + '/' + entity.getId();
  requestObject.method = 'PUT';
  requestObject.body = [JSON.stringify(entity)];

  return HttpClient.request(requestObject)
    .then(function (response){
      return response.body.read();
    }).then(function (buffer){
      return JSON.parse(buffer.toString());
    });
}

module.exports = Http;
