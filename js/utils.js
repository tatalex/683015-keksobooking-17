'use strict';


(function () {

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElementFromArray = function (array) {
    return array[getRandomInRange(0, array.length)];
  };

  window.utils = {
    getRandomInRange: getRandomInRange,
    getRandomElementFromArray: getRandomElementFromArray
  };
})();
