'use strict';

var ADS_AMOUNT = 8;
var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];

var mapWidth = map.offsetWidth;

var POSITION_MAX_Y = 630;
var POSITION_MIN_Y = 130;


// adds mock data
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateAd = function (adNumber) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + adNumber + '.png'
    },
    offer: {
      type: typesOfHousing[getRandomInRange(0, typesOfHousing.length)]
    },
    location: {
      x: getRandomInRange(0, mapWidth),
      y: getRandomInRange(POSITION_MIN_Y, POSITION_MAX_Y)
    }
  };

  return ad;
};

var generateAllAds = function(count) {
  var allAds = [];
  for (var i = 1; i <= ADS_AMOUNT; i++) {
    allAds.push(generateAd(i));
  }

  return allAds;
};

var allAdsCollection = generateAllAds(ADS_AMOUNT);
