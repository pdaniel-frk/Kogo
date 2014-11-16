
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Board overview screen', function () {

  it ('should list all tickets', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).click();

    assertAllShowUp(element);
  });

  // ------------------------------------------------------------------------
  // ------------------------ TESTING SPRINTS FILTER ------------------------
  // ------------------------------------------------------------------------

  it ('should show select2 filter for sprints', function () {

    element.all(by.repeater('sprint in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(2);
        expect(arr[0].evaluate('sprint.name')).toBe('Sprint 0.0.1');

        expect(arr[1].evaluate('sprint.name')).toBe('Sprint 0.0.2');
      });

    expect(element(by.model('filters.sprints')).isPresent()).toBe(true);

    // -------------------------------------------------------------

    element(by.css('#sprintsSelector .select2-choices input')).sendKeys('0.1');

    element.all(by.repeater('sprint in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('sprint.name')).toBe('Sprint 0.0.1');
      });

    // -------------------------------------------------------------

    element(by.css('#sprintsSelector .select2-choices input')).clear();
    element(by.css('#sprintsSelector .select2-choices input')).sendKeys('0.2');

    element.all(by.repeater('sprint in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('sprint.name')).toBe('Sprint 0.0.2');
      });

    element(by.css('#sprintsSelector .select2-choices input')).clear();
  });

  // ------------------------------------------------------------------------
  // ----------------------- TESTING ASSIGNEES FILTER -----------------------
  // ------------------------------------------------------------------------

  it ('should show select2 filter for assignees', function () {

    element(by.css('#assigneesSelector .select2-choices input')).click();

    element.all(by.repeater('user in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(19);

        expect(arr[0].evaluate('user.username')).toBe('unknown');
        expect(arr[0].evaluate('user.firstName')).toBe('Unknown');
        expect(arr[0].evaluate('user.lastName')).toBe('Unknown');
        expect(arr[0].evaluate('user.email')).toBe('');

        expect(arr[1].evaluate('user.username')).toBe('dahlberg.reindl');
        expect(arr[1].evaluate('user.firstName')).toBe('Dahlberg');
        expect(arr[1].evaluate('user.lastName')).toBe('Reindl');
        expect(arr[1].evaluate('user.email')).toBe('dahlberg.reindl@hedonsoftware.com');

        expect(arr[2].evaluate('user.username')).toBe('hanlon.sheaoconnor');
        expect(arr[2].evaluate('user.firstName')).toBe('Hanlon');
        expect(arr[2].evaluate('user.lastName')).toBe('Shea-o\'connor');
        expect(arr[2].evaluate('user.email')).toBe('hanlon.sheaoconnor@hedonsoftware.com');

        expect(arr[3].evaluate('user.username')).toBe('athanassakis.linehan');
        expect(arr[3].evaluate('user.firstName')).toBe('Athanassakis');
        expect(arr[3].evaluate('user.lastName')).toBe('Linehan');
        expect(arr[3].evaluate('user.email')).toBe('athanassakis.linehan@hedonsoftware.com');

        expect(arr[4].evaluate('user.username')).toBe('pearce.nagaran');
        expect(arr[4].evaluate('user.firstName')).toBe('Pearce');
        expect(arr[4].evaluate('user.lastName')).toBe('Nagaran');
        expect(arr[4].evaluate('user.email')).toBe('pearce.nagaran@hedonsoftware.com');

        expect(arr[5].evaluate('user.username')).toBe('jardetzky.gallucio');
        expect(arr[5].evaluate('user.firstName')).toBe('Jardetzky');
        expect(arr[5].evaluate('user.lastName')).toBe('Gallucio');
        expect(arr[5].evaluate('user.email')).toBe('jardetzky.gallucio@hedonsoftware.com');

        expect(arr[6].evaluate('user.username')).toBe('rothbard.turrall');
        expect(arr[6].evaluate('user.firstName')).toBe('Rothbard');
        expect(arr[6].evaluate('user.lastName')).toBe('Turrall');
        expect(arr[6].evaluate('user.email')).toBe('rothbard.turrall@hedonsoftware.com');

        expect(arr[7].evaluate('user.username')).toBe('joensen.mortera');
        expect(arr[7].evaluate('user.firstName')).toBe('Joensen');
        expect(arr[7].evaluate('user.lastName')).toBe('Mortera');
        expect(arr[7].evaluate('user.email')).toBe('joensen.mortera@hedonsoftware.com');

        expect(arr[8].evaluate('user.username')).toBe('sheerr.strugnell');
        expect(arr[8].evaluate('user.firstName')).toBe('Sheerr');
        expect(arr[8].evaluate('user.lastName')).toBe('Strugnell');
        expect(arr[8].evaluate('user.email')).toBe('sheerr.strugnell@hedonsoftware.com');

        expect(arr[9].evaluate('user.username')).toBe('nezzer.heskett');
        expect(arr[9].evaluate('user.firstName')).toBe('Nezzer');
        expect(arr[9].evaluate('user.lastName')).toBe('Heskett');
        expect(arr[9].evaluate('user.email')).toBe('nezzer.heskett@hedonsoftware.com');

        expect(arr[10].evaluate('user.username')).toBe('orson.carte');
        expect(arr[10].evaluate('user.firstName')).toBe('Orson');
        expect(arr[10].evaluate('user.lastName')).toBe('Carte');
        expect(arr[10].evaluate('user.email')).toBe('orson.carte@hedonsoftware.com');

        expect(arr[11].evaluate('user.username')).toBe('ray.gunn');
        expect(arr[11].evaluate('user.firstName')).toBe('Ray');
        expect(arr[11].evaluate('user.lastName')).toBe('Gunn');
        expect(arr[11].evaluate('user.email')).toBe('ray.gunn@hedonsoftware.com');

        expect(arr[12].evaluate('user.username')).toBe('biff.wellington');
        expect(arr[12].evaluate('user.firstName')).toBe('Biff');
        expect(arr[12].evaluate('user.lastName')).toBe('Wellington');
        expect(arr[12].evaluate('user.email')).toBe('biff.wellington@hedonsoftware.com');

        expect(arr[13].evaluate('user.username')).toBe('marcus.glover');
        expect(arr[13].evaluate('user.firstName')).toBe('Marcus');
        expect(arr[13].evaluate('user.lastName')).toBe('Glover');
        expect(arr[13].evaluate('user.email')).toBe('marcus.glover@hedonsoftware.com');

        expect(arr[14].evaluate('user.username')).toBe('duane.bowman');
        expect(arr[14].evaluate('user.firstName')).toBe('Duane');
        expect(arr[14].evaluate('user.lastName')).toBe('Bowman');
        expect(arr[14].evaluate('user.email')).toBe('fernald.schimmel@hedonsoftware.com');

        expect(arr[15].evaluate('user.username')).toBe('nathan.frazier');
        expect(arr[15].evaluate('user.firstName')).toBe('Nathan');
        expect(arr[15].evaluate('user.lastName')).toBe('Frazier');
        expect(arr[15].evaluate('user.email')).toBe('fernald.schimmel@hedonsoftware.com');

        expect(arr[16].evaluate('user.username')).toBe('marvin.park');
        expect(arr[16].evaluate('user.firstName')).toBe('Marvin');
        expect(arr[16].evaluate('user.lastName')).toBe('Park');
        expect(arr[16].evaluate('user.email')).toBe('fernald.schimmel@hedonsoftware.com');

        expect(arr[17].evaluate('user.username')).toBe('rigoberto.rubin');
        expect(arr[17].evaluate('user.firstName')).toBe('Rigoberto');
        expect(arr[17].evaluate('user.lastName')).toBe('Rubin');
        expect(arr[17].evaluate('user.email')).toBe('rigobertorubin@hedonsoftware.com');

        expect(arr[18].evaluate('user.username')).toBe('travis.pollack');
        expect(arr[18].evaluate('user.firstName')).toBe('Travis');
        expect(arr[18].evaluate('user.lastName')).toBe('Pollack');
        expect(arr[18].evaluate('user.email')).toBe('travispollack@hedonsoftware.com');
      });

    expect(element(by.model('filters.assignees')).isPresent()).toBe(true);

    // -------------------------------------------------------------

    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Marcus');

    element.all(by.repeater('user in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('marcus.glover');
        expect(arr[0].evaluate('user.firstName')).toBe('Marcus');
        expect(arr[0].evaluate('user.lastName')).toBe('Glover');
        expect(arr[0].evaluate('user.email')).toBe('marcus.glover@hedonsoftware.com');
      });

    // -------------------------------------------------------------

    element(by.css('#assigneesSelector .select2-choices input')).clear();
    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Ray');

    element.all(by.repeater('user in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(1);

        expect(arr[0].evaluate('user.username')).toBe('ray.gunn');
        expect(arr[0].evaluate('user.firstName')).toBe('Ray');
        expect(arr[0].evaluate('user.lastName')).toBe('Gunn');
        expect(arr[0].evaluate('user.email')).toBe('ray.gunn@hedonsoftware.com');
      });

    element(by.css('#assigneesSelector .select2-choices input')).clear();
  });

  // ------------------------------------------------------------------------
  // --------------------- TESTING FILTERING BY SPRINTS ---------------------
  // ------------------------------------------------------------------------

  it ('should filter tickets using select2 sprints filter', function () {

    element(by.css('#sprintsSelector .select2-choices input')).click();
    element(by.css('#sprintsSelector .select2-choices input')).clear();
    element(by.css('#sprintsSelector .select2-choices input')).sendKeys('0.1');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        expect(arr[0].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(11);

        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(3);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(4);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(8);
        expect(arr[2].evaluate('lane.tickets[3].id')).toBe(17);
        expect(arr[2].evaluate('lane.tickets[4].id')).toBe(18);
        expect(arr[2].evaluate('lane.tickets[5].id')).toBe(21);
        expect(arr[2].evaluate('lane.tickets[6].id')).toBe(29);
        expect(arr[2].evaluate('lane.tickets[7].id')).toBe(32);
        expect(arr[2].evaluate('lane.tickets[8].id')).toBe(33);
        expect(arr[2].evaluate('lane.tickets[9].id')).toBe(41);
        expect(arr[2].evaluate('lane.tickets[10].id')).toBe(43);

        expect(arr[0].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(152);
      });

    element(by.css('#sprintsSelector .select2-choices input')).sendKeys('0.2');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    assertAllShowUp(element);

    element.all(by.css('#sprintsSelector .ui-select-match-close.select2-search-choice-close')).click();

    element(by.css('form .btn-filter')).click();

    assertAllShowUp(element);
  });

  // ------------------------------------------------------------------------
  // -------------------- TESTING FILTERING BY ASSIGNEES --------------------
  // ------------------------------------------------------------------------

  it ('should filter tickets using select2 assignees filter', function () {

    element(by.css('#assigneesSelector .select2-choices input')).clear();
    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Nathan');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        expect(arr[0].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(1);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(1);

        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(11);
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(29);

        expect(arr[0].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(5);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(20);
      });

    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Biff');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        expect(arr[0].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(1);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(3);

        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(11);
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(3);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(29);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(30);

        expect(arr[0].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(5);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(33);
      });

    element.all(by.css('#assigneesSelector .ui-select-match-close.select2-search-choice-close')).click();

    element(by.css('form .btn-filter')).click();

    assertAllShowUp(element);
  });

  // ------------------------------------------------------------------------
  // --------------- TESTING FILTERING BY SPRINTS & ASSIGNEES ---------------
  // ------------------------------------------------------------------------

  it ('should filter tickets using select2 sprints & assignees filters', function () {

    // setting sprint
    element(by.css('#sprintsSelector .select2-choices input')).click();
    element(by.css('#sprintsSelector .select2-choices input')).clear();
    element(by.css('#sprintsSelector .select2-choices input')).sendKeys('0.2');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    // setting assignees
    element(by.css('#assigneesSelector .select2-choices input')).clear();
    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Biff');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('#assigneesSelector .select2-choices input')).clear();
    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Nathan');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        expect(arr[0].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(1);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(1);

        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(11);
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(30);

        expect(arr[0].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(5);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(8);
      });

    element(by.css('#assigneesSelector .select2-choices input')).sendKeys('Rothbard');

    element(by.css('.ui-select-choices-row.ng-scope.select2-highlighted')).click();

    element(by.css('form .btn-filter')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        expect(arr[0].evaluate('lane.tickets.length')).toBe(0);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(2);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(1);

        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(11);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(13);
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(30);

        expect(arr[0].evaluate('lane.storyPoints')).toBe(0);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(10);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(8);
      });
  });
});

function assertAllShowUp(element) {
    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        // to do lane tests
        expect(arr[0].evaluate('lane.tickets.length')).toBe(6);
        expect(arr[0].evaluate('lane.storyPoints')).toBe(42);
        expect(arr[0].evaluate('lane.tickets[0].id')).toBe(1);
        expect(arr[0].evaluate('lane.tickets[1].id')).toBe(7);
        expect(arr[0].evaluate('lane.tickets[2].id')).toBe(15);
        expect(arr[0].evaluate('lane.tickets[3].id')).toBe(37);
        expect(arr[0].evaluate('lane.tickets[4].id')).toBe(40);
        expect(arr[0].evaluate('lane.tickets[5].id')).toBe(42);

        // in progress lane tests
        expect(arr[1].evaluate('lane.tickets.length')).toBe(5);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(53);
        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(11);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(13);
        expect(arr[1].evaluate('lane.tickets[2].id')).toBe(22);
        expect(arr[1].evaluate('lane.tickets[3].id')).toBe(24);
        expect(arr[1].evaluate('lane.tickets[4].id')).toBe(31);

        // done lane tests
        expect(arr[2].evaluate('lane.tickets.length')).toBe(17);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(211);
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(3);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(4);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(8);
        expect(arr[2].evaluate('lane.tickets[3].id')).toBe(10);
        expect(arr[2].evaluate('lane.tickets[4].id')).toBe(14);
        expect(arr[2].evaluate('lane.tickets[5].id')).toBe(17);
        expect(arr[2].evaluate('lane.tickets[6].id')).toBe(18);
        expect(arr[2].evaluate('lane.tickets[7].id')).toBe(20);
        expect(arr[2].evaluate('lane.tickets[8].id')).toBe(21);
        expect(arr[2].evaluate('lane.tickets[9].id')).toBe(26);
        expect(arr[2].evaluate('lane.tickets[10].id')).toBe(29);
        expect(arr[2].evaluate('lane.tickets[11].id')).toBe(30);
        expect(arr[2].evaluate('lane.tickets[12].id')).toBe(32);
        expect(arr[2].evaluate('lane.tickets[13].id')).toBe(33);
        expect(arr[2].evaluate('lane.tickets[14].id')).toBe(36);
        expect(arr[2].evaluate('lane.tickets[15].id')).toBe(41);
        expect(arr[2].evaluate('lane.tickets[16].id')).toBe(43);
      });
}
