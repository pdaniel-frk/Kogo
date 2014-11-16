
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

app.directive('droppable', function () {
  return {
    scope: {
      drop: '&', // parent
      lane: '='
    },
    link: function (scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function (e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
        },
        false
      );

      el.addEventListener(
        'dragenter',
        function (e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function (e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function (e) {
          var boxId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);

          // call the passed drop function
          scope.$apply(function (scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(item.id, boxId);
            }
          });
        },
        false
      );
    }
  }
});
