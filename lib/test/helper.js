
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var _         = require('underscore');
var fs        = require('fs');
var Exception = require('../exception');
var logger    = require('../logger');

/**
 * Class constructor takes path to test
 *
 * @param String testDir Path to test file
 */
function Helper(testDir) {
  this.setTestPath(testDir);
};

/**
 * Placeholder for db connection
 *
 * @type Object
 */
Helper.prototype.dbConnection = null;

/**
 * Placeholder for path to test
 *
 * @type String
 */
Helper.prototype.testPath = null;

/**
 * Placeholder for path to test's fixtures directory
 *
 * @type String
 */
Helper.prototype.testFixturesDirPath = null;

/**
 * Placeholder for path to test's data providers directory
 *
 * @type String
 */
Helper.prototype.testDataProvidersDirPath = null;

/**
 * Db connection setter
 *
 * @param Object dbConnection Database connection
 */
Helper.prototype.setDbConnection = function (dbConnection) {
  dbConnection = dbConnection || require('db');
  this.dbConnection = dbConnection;
}

/**
 * Db connection getter
 *
 * @return Object [description]
 */
Helper.prototype.getDbConnection = function () {
  if (this.dbConnection === null) {
    this.dbConnection = require('../db');
  }

  return this.dbConnection;
}

/**
 * Sets path to test file
 *
 * @param String testPath Path to test file
 * @return Helper this Fluent interface
 */
Helper.prototype.setTestPath = function (testPath) {

  try {
    if (!_.isString(testPath) || !fs.realpathSync(testPath)) {
        // lovely interface of fs package...
    }
  } catch (e) {
    throw new Exception('Invalid test path provided');
  }

  this.testPath = testPath;
  return this;
}

/**
 * Returns path to test file
 *
 * @return String testPath Path to test file
 */
Helper.prototype.getTestPath = function () {
  return this.testPath;
}

/**
 * Sets path to test's fixtures directory
 *
 * @param String testFixturesDirPath Path to test's fixtures directory
 * @return Helper this Fluent interface
 */
Helper.prototype.setTestFixturesDirPath = function (testFixturesDirPath) {

  try {
    if (!_.isString(testFixturesDirPath) || !fs.realpathSync(testFixturesDirPath)) {
      // lovely interface of fs package...
    }
  } catch (e) {
    throw new Exception('Invalid test\'s fixtures path provided');
  }

  this.testFixturesDirPath = testFixturesDirPath;
  return this;
}

/**
 * Returns path to test's fixtures directory
 *
 * @return String testFixturesDirPath Path to test's fixtures directory
 */
Helper.prototype.getTestFixturesDirPath = function () {
  if (!_.isString(this.testFixturesDirPath)) {
    var testPath = this.getTestPath();

    // deleting '.js'
    var tempFixturesDir = testPath.substr(0, testPath.length-3);

    // getting base by everything up to '/test/'
    var testDirPath = tempFixturesDir.substr(0, tempFixturesDir.indexOf('/test/'));

    // relPath is everything after '/test/'
    var relPath = tempFixturesDir.substr(testDirPath.length + 6);

    // adding fixture and testing does it exists
    if (!fs.realpathSync(testDirPath + '/test/fixtures/' + relPath)) {
      return null;
    }

    this.testFixturesDirPath = testDirPath + '/test/fixtures/' + relPath + '/';
  }

  return this.testFixturesDirPath;
}

/**
 * Sets path to test's data provider directory
 *
 * @param String testDataProvidersDirPath Path to test's data provider directory
 * @return Helper this Fluent interface
 */
Helper.prototype.setTestDataProvidersDirPath = function (testDataProvidersDirPath) {

  try {
    if (!_.isString(testDataProvidersDirPath) || !fs.realpathSync(testDataProvidersDirPath)) {
      // lovely interface of fs package...
    }
  } catch (e) {
    throw new Exception('Invalid test\'s data provider directory path provided');
  }

  this.testDataProvidersDirPath = testDataProvidersDirPath;
  return this;
}

/**
 * Returns path to test's data provider directory
 *
 * @return String testDataProvidersDirPath Path to test's data provider directory
 */
Helper.prototype.getTestDataProvidersDirPath = function () {
  if (!_.isString(this.testDataProvidersDirPath)) {
    var testPath = this.getTestPath();

    // deleting '.js'
    var tempDataProviderDir = testPath.substr(0, testPath.length-3);

    // getting base by everything up to '/test/'
    var testDirPath = tempDataProviderDir.substr(0, tempDataProviderDir.indexOf('/test/'));

    // relPath is everything after '/test/'
    var relPath = tempDataProviderDir.substr(testDirPath.length + 6);

    // adding fixture and testing does it exists
    if (!fs.realpathSync(testDirPath + '/test/dataProviders/' + relPath)) {
      return null;
    }

    this.testDataProvidersDirPath = testDirPath + '/test/dataProviders/' + relPath + '/';
  }

  return this.testDataProvidersDirPath;
}

/**
 * Executes fixture script
 *
 * @param String   fileName Filename of SQL script (without .sql)
 * @param Function callback Done callback
 * @return Helper this Fluent interface
 */
Helper.prototype.executeFixtureScript = function (fileName, callback) {

    var text = fs.readFileSync(this.getTestFixturesDirPath() + fileName + '.sql', 'utf8');

    logger.info(text);

    // running execute in sync-way
    this.getDbConnection().query(text, function (err, data, fields) {
      if (err) console.log(err);
      callback();
    })
}

/**
 * Returns required data provider's data
 *
 * @param  String fileName Filename of data provider (without .js)
 * @return Helper this Fluent interface
 */
Helper.prototype.getDataProvider = function (fileName) {
    return require(this.getTestDataProvidersDirPath() + fileName + '.js');
}

module.exports = Helper;
