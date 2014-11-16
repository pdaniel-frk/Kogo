
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Board overview screen', function () {

  it ('should contain create ticket button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).click();

    expect(element(by.css('#showCreateTicketModalButton')).isPresent()).toBe(true);
  });

  it ('should open modal after clicking create ticket button', function () {

    element(by.css('#showCreateTicketModalButton')).click();
    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Add Ticket');
  });

  it ('should contain all model fields', function () {

    expect(element(by.model('modalTicket.name')).isPresent()).toBe(true);

    expect(element(by.model('modalTicket.name')).getAttribute('value')).toBe('');
    expect(element(by.model('modalTicket.description')).getAttribute('text')).toBe(null);
    expect(element(by.model('modalTicket.storyPoints')).getAttribute('value')).toBe('');
    expect(element(by.model('modalTicket.assignee')).getAttribute('value')).toBe(null);
    expect(element(by.model('modalTicket.sprint')).getAttribute('value')).toBe(null);
    expect(element(by.model('modalTicket.laneId')).getAttribute('value')).toBe('4');
  });

  it ('should list all assignees', function () {

    element.all(by.repeater('modalUser in $select.items'))
      .then(function(arr) {
        expect(arr.length).toBe(99);
      });
  });

  it ('should list all sprints', function () {

    element.all(by.repeater('modalSprint in $select.items'))
      .then(function(arr) {
        expect(arr.length).toBe(2);
      });
  });

  it ('should list all lanes', function () {

    element.all(by.repeater('modalLane in modalLanes'))
      .then(function(arr) {
        expect(arr.length).toBe(4);
      });
  });

  it ('adds tickets to board', function () {

    // sanity check before adding ticket
    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        // ---- tickets count checked ----

        expect(arr[0].evaluate('lane.tickets.length')).toBe(5);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(3);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(3);
        expect(arr[3].evaluate('lane.tickets.length')).toBe(8);

        // ---- all tickets checked by ids ----

        // first lane
        expect(arr[0].evaluate('lane.tickets[0].id')).toBe(16);
        expect(arr[0].evaluate('lane.tickets[1].id')).toBe(19);
        expect(arr[0].evaluate('lane.tickets[2].id')).toBe(23);
        expect(arr[0].evaluate('lane.tickets[3].id')).toBe(39);
        expect(arr[0].evaluate('lane.tickets[4].id')).toBe(45);

        // second lane
        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(25);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(34);
        expect(arr[1].evaluate('lane.tickets[2].id')).toBe(46);

        // third lane
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(12);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(38);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(47);

        // fourth lane
        expect(arr[3].evaluate('lane.tickets[0].id')).toBe(2);
        expect(arr[3].evaluate('lane.tickets[1].id')).toBe(5);
        expect(arr[3].evaluate('lane.tickets[2].id')).toBe(6);
        expect(arr[3].evaluate('lane.tickets[3].id')).toBe(9);
        expect(arr[3].evaluate('lane.tickets[4].id')).toBe(27);
        expect(arr[3].evaluate('lane.tickets[5].id')).toBe(28);
        expect(arr[3].evaluate('lane.tickets[6].id')).toBe(35);
        expect(arr[3].evaluate('lane.tickets[7].id')).toBe(44);

        // ---- total story points ----
        expect(arr[0].evaluate('lane.storyPoints')).toBe(57);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(52);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(39);
        expect(arr[3].evaluate('lane.storyPoints')).toBe(91);
      });

    element(by.model('modalTicket.name')).sendKeys('Test ticket');

    element(by.model('modalTicket.description')).click();
    element(by.css('#description-form-group div[contenteditable="true"]'))
      .sendKeys('Test long description');

    element(by.model('modalTicket.storyPoints')).click();
    element(by.model('modalTicket.storyPoints')).sendKeys('34');

    element(by.css('#assignee-form-group .select2')).click();
    element(by.css('#assignee-form-group .select2-search input')).sendKeys('gonzales');
    element(by.css('#assignee-form-group .ui-select-choices-row.select2-highlighted')).click();

    element(by.css('#sprint-form-group .select2')).click();
    element(by.css('#sprint-form-group .select2-search input')).sendKeys('1.0.1');
    element(by.css('#sprint-form-group .ui-select-choices-row.select2-highlighted')).click();

    element(by.model('modalTicket.laneId')).click();
    element(by.cssContainingText('#lane-form-group option', 'Development')).click();

    element(by.css('#createTicketButton')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        // ---- tickets count checked ----

        expect(arr[0].evaluate('lane.tickets.length')).toBe(5);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(4);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(3);
        expect(arr[3].evaluate('lane.tickets.length')).toBe(8);

        // ---- all tickets checked by ids ----

        // first lane
        expect(arr[0].evaluate('lane.tickets[0].id')).toBe(16);
        expect(arr[0].evaluate('lane.tickets[1].id')).toBe(19);
        expect(arr[0].evaluate('lane.tickets[2].id')).toBe(23);
        expect(arr[0].evaluate('lane.tickets[3].id')).toBe(39);
        expect(arr[0].evaluate('lane.tickets[4].id')).toBe(45);

        // second lane
        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(25);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(34);
        expect(arr[1].evaluate('lane.tickets[2].id')).toBe(46);
        expect(arr[1].evaluate('lane.tickets[3].id')).toBe(61);

        // third lane
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(12);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(38);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(47);

        // fourth lane
        expect(arr[3].evaluate('lane.tickets[0].id')).toBe(2);
        expect(arr[3].evaluate('lane.tickets[1].id')).toBe(5);
        expect(arr[3].evaluate('lane.tickets[2].id')).toBe(6);
        expect(arr[3].evaluate('lane.tickets[3].id')).toBe(9);
        expect(arr[3].evaluate('lane.tickets[4].id')).toBe(27);
        expect(arr[3].evaluate('lane.tickets[5].id')).toBe(28);
        expect(arr[3].evaluate('lane.tickets[6].id')).toBe(35);
        expect(arr[3].evaluate('lane.tickets[7].id')).toBe(44);

        // ---- total story points ----
        expect(arr[0].evaluate('lane.storyPoints')).toBe(57);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(86);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(39);
        expect(arr[3].evaluate('lane.storyPoints')).toBe(91);
      });
  });


  it ('adds ticket without assignee', function () {

    element(by.css('#showCreateTicketModalButton')).click();

    element(by.model('modalTicket.name')).sendKeys('Test ticket');

    element(by.model('modalTicket.description')).click();
    element(by.css('#description-form-group div[contenteditable="true"]'))
      .sendKeys('Test long description');

    element(by.model('modalTicket.storyPoints')).click();
    element(by.model('modalTicket.storyPoints')).sendKeys('13');

    element(by.css('#sprint-form-group .select2')).click();
    element(by.css('#sprint-form-group .select2-search input')).sendKeys('1.0.1');
    element(by.css('#sprint-form-group .ui-select-choices-row.select2-highlighted')).click();

    element(by.model('modalTicket.laneId')).click();
    element(by.cssContainingText('#lane-form-group option', 'Review')).click();

    element(by.css('#createTicketButton')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        // ---- tickets count checked ----

        expect(arr[0].evaluate('lane.tickets.length')).toBe(5);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(4);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(4);
        expect(arr[3].evaluate('lane.tickets.length')).toBe(8);

        // ---- all tickets checked by ids ----

        // first lane
        expect(arr[0].evaluate('lane.tickets[0].id')).toBe(16);
        expect(arr[0].evaluate('lane.tickets[1].id')).toBe(19);
        expect(arr[0].evaluate('lane.tickets[2].id')).toBe(23);
        expect(arr[0].evaluate('lane.tickets[3].id')).toBe(39);
        expect(arr[0].evaluate('lane.tickets[4].id')).toBe(45);

        // second lane
        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(25);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(34);
        expect(arr[1].evaluate('lane.tickets[2].id')).toBe(46);
        expect(arr[1].evaluate('lane.tickets[3].id')).toBe(61);

        // third lane
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(12);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(38);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(47);
        expect(arr[2].evaluate('lane.tickets[3].id')).toBe(62);

        // fourth lane
        expect(arr[3].evaluate('lane.tickets[0].id')).toBe(2);
        expect(arr[3].evaluate('lane.tickets[1].id')).toBe(5);
        expect(arr[3].evaluate('lane.tickets[2].id')).toBe(6);
        expect(arr[3].evaluate('lane.tickets[3].id')).toBe(9);
        expect(arr[3].evaluate('lane.tickets[4].id')).toBe(27);
        expect(arr[3].evaluate('lane.tickets[5].id')).toBe(28);
        expect(arr[3].evaluate('lane.tickets[6].id')).toBe(35);
        expect(arr[3].evaluate('lane.tickets[7].id')).toBe(44);

        // ---- total story points ----
        expect(arr[0].evaluate('lane.storyPoints')).toBe(57);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(86);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(52);
        expect(arr[3].evaluate('lane.storyPoints')).toBe(91);
      });
  });

  it ('adds tickets not assigned to sprint', function () {

    element(by.css('#showCreateTicketModalButton')).click();

    element(by.model('modalTicket.name')).sendKeys('Test ticket');

    element(by.model('modalTicket.description')).click();
    element(by.css('#description-form-group div[contenteditable="true"]'))
      .sendKeys('Test long description');

    element(by.model('modalTicket.storyPoints')).click();
    element(by.model('modalTicket.storyPoints')).sendKeys('8');

    element(by.css('#assignee-form-group .select2')).click();
    element(by.css('#assignee-form-group .select2-search input')).sendKeys('pearce');
    element(by.css('#assignee-form-group .ui-select-choices-row.select2-highlighted')).click();

    element(by.model('modalTicket.laneId')).click();
    element(by.cssContainingText('#lane-form-group option', 'Done')).click();

    element(by.css('#createTicketButton')).click();

    element.all(by.repeater("lane in lanes track by lane.id"))
      .then(function (arr) {

        // ---- tickets count checked ----

        expect(arr[0].evaluate('lane.tickets.length')).toBe(5);
        expect(arr[1].evaluate('lane.tickets.length')).toBe(4);
        expect(arr[2].evaluate('lane.tickets.length')).toBe(4);
        expect(arr[3].evaluate('lane.tickets.length')).toBe(9);

        // ---- all tickets checked by ids ----

        // first lane
        expect(arr[0].evaluate('lane.tickets[0].id')).toBe(16);
        expect(arr[0].evaluate('lane.tickets[1].id')).toBe(19);
        expect(arr[0].evaluate('lane.tickets[2].id')).toBe(23);
        expect(arr[0].evaluate('lane.tickets[3].id')).toBe(39);
        expect(arr[0].evaluate('lane.tickets[4].id')).toBe(45);

        // second lane
        expect(arr[1].evaluate('lane.tickets[0].id')).toBe(25);
        expect(arr[1].evaluate('lane.tickets[1].id')).toBe(34);
        expect(arr[1].evaluate('lane.tickets[2].id')).toBe(46);
        expect(arr[1].evaluate('lane.tickets[3].id')).toBe(61);

        // third lane
        expect(arr[2].evaluate('lane.tickets[0].id')).toBe(12);
        expect(arr[2].evaluate('lane.tickets[1].id')).toBe(38);
        expect(arr[2].evaluate('lane.tickets[2].id')).toBe(47);
        expect(arr[2].evaluate('lane.tickets[3].id')).toBe(62);

        // fourth lane
        expect(arr[3].evaluate('lane.tickets[0].id')).toBe(2);
        expect(arr[3].evaluate('lane.tickets[1].id')).toBe(5);
        expect(arr[3].evaluate('lane.tickets[2].id')).toBe(6);
        expect(arr[3].evaluate('lane.tickets[3].id')).toBe(9);
        expect(arr[3].evaluate('lane.tickets[4].id')).toBe(27);
        expect(arr[3].evaluate('lane.tickets[5].id')).toBe(28);
        expect(arr[3].evaluate('lane.tickets[6].id')).toBe(35);
        expect(arr[3].evaluate('lane.tickets[7].id')).toBe(44);
        expect(arr[3].evaluate('lane.tickets[8].id')).toBe(63);

        // ---- total story points ----
        expect(arr[0].evaluate('lane.storyPoints')).toBe(57);
        expect(arr[1].evaluate('lane.storyPoints')).toBe(86);
        expect(arr[2].evaluate('lane.storyPoints')).toBe(52);
        expect(arr[3].evaluate('lane.storyPoints')).toBe(99);
      });
  });
});
