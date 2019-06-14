'use strict';

var ADS_AMOUNT = 8;
var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
var allMapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var mapWidth = map.offsetWidth;

var POSITION_MAX_Y = 630;
var POSITION_MIN_Y = 130;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// adds mock data
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementFromArray = function (array) {
  return array[getRandomInRange(0, array.length)];
};


var generateAd = function (index) {
  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      type: getRandomElementFromArray(typesOfHousing)
    },
    location: {
      x: getRandomInRange(0, mapWidth),
      y: getRandomInRange(POSITION_MIN_Y, POSITION_MAX_Y)
    }
  };
};

var generateAds = function () {
  var ads = [];
  for (var i = 1; i <= ADS_AMOUNT; i++) {
    ads.push(generateAd(i));
  }

  return ads;
};

var adsCollection = generateAds(ADS_AMOUNT);

// removes class .map--faded
map.classList.remove('map--faded');

// renders pin
var renderPin = function (ad) {
  var pinOfMap = pinTemplate.cloneNode(true);
  pinOfMap.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
  pinOfMap.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
  pinOfMap.querySelector('img').src = ad.author.avatar;
  pinOfMap.querySelector('img').alt = ad.offer.type;

  return pinOfMap;
};

// adds pins to the map
var addPins = function () {
  for (var i = 0; i < adsCollection.length; i++) {
    fragment.appendChild(renderPin(adsCollection[i]));
  }

  allMapPins.appendChild(fragment);
};

addPins();
