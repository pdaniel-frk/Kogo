
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'login.js',
    'projects.js',
    'boards.js',
    'board-filters.js',
    'board-create-ticket-modal.js',
    'board-create-sprint-modal.js',
    //'planning.js'
  ],
  capabilities : {
    browserName : 'chrome',
    'chromeOptions': {
        args: ['--test-type']
    }
  }
};
