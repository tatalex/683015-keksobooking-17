'use strict';


(function () {
  // switches disable attribute
  var switchDisableAttribute = function (elements, value) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }
  };

  window.utils = {
    switchDisableAttribute: switchDisableAttribute
  };
})();
