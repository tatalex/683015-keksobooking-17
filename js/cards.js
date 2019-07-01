'use strict';

(function () {
  var TYPES_OF_HOUSING = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  // adds mock data
  var generateAd = function (index) {
    return {
      author: {
        avatar: 'img/avatars/user0' + index + '.png'
      },
      offer: {
        type: window.utils.getRandomElementFromArray(TYPES_OF_HOUSING)
      },
      location: {
        x: window.utils.getRandomInRange(window.POSITION_MIN_X, window.POSITION_MAX_X),
        y: window.utils.getRandomInRange(window.POSITION_MIN_Y, window.POSITION_MAX_Y)
      }
    };
  };

  var generateAds = function () {
    var ads = [];
    for (var i = 1; i <= window.ADS_AMOUNT; i++) {
      ads.push(generateAd(i));
    }

    return ads;
  };

  window.TYPES_OF_HOUSING = TYPES_OF_HOUSING;

  window.cards = {
    generateAds: generateAds
  };
})();
