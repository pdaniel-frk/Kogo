
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var KogoService = require(LIBRARY_PATH + '/service');
var util        = require('util');
var HTTP        = require("q-io/http");

/**
 * Tickets service class definition
 * @param Object requestOptions Optional custom request options
 */
function TicketsService(requestOptions){
  requestOptions = requestOptions || {};
  requestOptions.path = '/tickets';
  this.setRequestOptions(requestOptions);
};

/**
 * TicketsService extends KogoService
 */
util.inherits(TicketsService, KogoService);


TicketsService.prototype.getTicket = function (ticketId){
  var requestOptions = this.getRequestOptions();
  requestOptions.path += '/' + ticketId;
  return HTTP.request(requestOptions);
};

module.exports = TicketsService;
