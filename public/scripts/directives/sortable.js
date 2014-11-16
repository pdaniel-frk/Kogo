
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

app.directive('sortable', function () {
    return function ($scope, element, attrs) {
      $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999,
        stop: function(event, ui) {

          var item = $(ui.item);
          // var itemId = item.attr("id");
          // var destId = item.parent().attr("id");
          // var sourceId = event.target.id;

          var ticketScope = angular.element(item).scope().ticket;
          var sourceLaneScope = angular.element(event.target).scope();
          var targetLaneScope = angular.element(item.parent()).scope();

          $scope.updateTicket(ticketScope, sourceLaneScope, targetLaneScope);
        }
      }).disableSelection();

      $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom")
        .css("cursor", "move");
    };
});
