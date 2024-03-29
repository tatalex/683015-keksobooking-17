'use strict';


(function () {
  var DEBOUNCE_INTERVAL = 300;

  // switches disable attribute
  var switchDisableAttribute = function (elements, value) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomId = function (objects) {
    objects.forEach(function (obj) {
      obj.id = Math.random().toString(36).substr(2, 9);
    });
  };

  window.utils = {
    switchDisableAttribute: switchDisableAttribute,
    debounce: debounce,
    getRandomId: getRandomId
  };
})();
