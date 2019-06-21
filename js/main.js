'use strict';

var ADS_AMOUNT = 8;
var typesOfHousing = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var map = document.querySelector('.map');
var allMapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var mapWidth = map.offsetWidth;

var POSITION_MAX_Y = 630;
var POSITION_MIN_Y = 130;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var adFieldset = adForm.querySelectorAll('fieldset');
var mapSelect = mapFilters.querySelectorAll('select');
var mapFieldset = mapFilters.querySelectorAll('fieldset');
var address = adForm.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');

var offerType = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

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

// switches disable attribute
var switchDisableAttribute = function (elements, value) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = value;
  }
};

// adds location to address field
var setAdressLocation = function () {
  var locationX = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
  var locationY = mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
  address.value = locationX + ', ' + locationY;
};

// creates function for active state
var onPinClick = function () {
  switchDisableAttribute(adFieldset, false);
  switchDisableAttribute(mapFieldset, false);
  switchDisableAttribute(mapSelect, false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addPins();
  setAdressLocation();
  mainPin.removeEventListener('click', onPinClick);
};

// synchronizes the time of departure and entry
var onFieldValueChange = function (evt) {
  var target = evt.target;
  var selectedField = target === timeOut ? timeIn : timeOut;
  selectedField.value = target.value;
};

// synchronizes housing type and price
var onHousingTypeChange = function (evt) {
  var minPriceOfType = typesOfHousing[offerType.value];

  price.min = minPriceOfType;
  price.placeholder = minPriceOfType;
};

switchDisableAttribute(adFieldset, true);
switchDisableAttribute(mapFieldset, true);
switchDisableAttribute(mapSelect, true);

mainPin.addEventListener('click', onPinClick);
mainPin.addEventListener('mouseup', onPinClick);

timeIn.addEventListener('change', onFieldValueChange);
timeOut.addEventListener('change', onFieldValueChange);
offerType.addEventListener('change', onHousingTypeChange);
