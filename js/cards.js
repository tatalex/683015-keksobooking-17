'use strict';

(function () {
   var typesOfHousing = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  window.typesOfHousing = typesOfHousing;

  // adds mock data
  var generateAd = function (index) {
    return {
      author: {
        avatar: 'img/avatars/user0' + index + '.png'
      },
      offer: {
        type: window.utils.getRandomElementFromArray(typesOfHousing)
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

  window.cards = {
    generateAds: generateAds
  };
})();
