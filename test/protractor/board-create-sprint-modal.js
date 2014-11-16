
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

describe('Board overview screen', function () {

  it ('should contain create sprint button', function () {

    expect(element(by.css('.sidebar-menu a[href="/projects"]')).isPresent()).toBe(true);
    element(by.css('.sidebar-menu a[href="/projects"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1"]')).click();

    expect(element(by.css('.table.table-hover a[href="/projects/1/boards/1"]')).isPresent()).toBe(true);
    element(by.css('.table.table-hover a[href="/projects/1/boards/2"]')).click();

    expect(element(by.css('#showCreateSprintModalButton')).isPresent()).toBe(true);
  });

  it ('should open modal after clicking create sprint button', function () {

    element(by.css('#showCreateSprintModalButton')).click();
    expect(element(by.css('.modal-dialog')).isPresent()).toBe(true);
    expect(element(by.css('.modal-dialog h4')).getText()).toBe('Add Sprint');
  });

  it ('should contain all model fields', function () {

    expect(element(by.model('modalSprint.name')).isPresent()).toBe(true);

    expect(element(by.model('modalSprint.name')).getAttribute('value')).toBe('');
    expect(element(by.model('modalSprint.description')).getAttribute('text')).toBe(null);
    expect(element(by.model('modalSprint.startDate')).getAttribute('value')).toBe('');
    expect(element(by.model('modalSprint.endDate')).getAttribute('value')).toBe('');
    expect(element(by.model('modalSprint.status')).getAttribute('value')).toBe('active');
    expect(element(by.model('modalSprint.boardId')).getAttribute('value')).toBe('2');
  });

  it ('should list all boards', function () {

    element.all(by.repeater('modalBoard in modalBoards'))
      .then(function(arr) {
        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('modalBoard.name')).toBe('Frontend');
        expect(arr[1].evaluate('modalBoard.name')).toBe('API');
        expect(arr[2].evaluate('modalBoard.name')).toBe('Backlog');
      });
  });

  it ('should allow to create a sprint', function () {

    element(by.model('modalSprint.name')).sendKeys('Test sprint');
    element(by.model('modalSprint.description')).sendKeys('Test long sprint description');

    element(by.model('modalSprint.startDate')).click();
    element(by.css('.ui-datepicker-calendar tr:nth-child(2) td[data-handler="selectDay"]:nth-child(4) a')).click();

    element(by.model('modalSprint.endDate')).click();
    element(by.css('.ui-datepicker-calendar tr:nth-child(4) td[data-handler="selectDay"]:nth-child(2) a')).click();

    element(by.css('#createSprintButton')).click();

    // confirm that sprint wasn't added to filters (as there's no tickets assigned to it)
    element.all(by.repeater('sprint in $select.items'))
      .then(function(arr) {

        expect(arr.length).toBe(2);
        expect(arr[0].evaluate('sprint.name')).toBe('Sprint 1.0.0');
        expect(arr[1].evaluate('sprint.name')).toBe('Sprint 1.0.1');
      });

    expect(element(by.model('filters.sprints')).isPresent()).toBe(true);

    element(by.css('#showCreateTicketModalButton')).click();

    element.all(by.repeater('modalSprint in $select.items'))
      .then(function(arr) {
        expect(arr.length).toBe(3);

        expect(arr[0].evaluate('modalSprint.name')).toBe('Sprint 1.0.0');
        expect(arr[1].evaluate('modalSprint.name')).toBe('Sprint 1.0.1');
        expect(arr[2].evaluate('modalSprint.name')).toBe('Test sprint');
      });

    element(by.css('#cancelButton')).click();
  });
});
