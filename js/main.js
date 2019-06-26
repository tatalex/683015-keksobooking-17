'use strict';

var ADS_AMOUNT = 8;
var typesOfHousing = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var map = document.querySelector('.map');
var allMapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();


var POSITION_MAX_Y = 630;
var POSITION_MIN_Y = 130;

var POSITION_MAX_X = map.offsetWidth;
var POSITION_MIN_X = 0;

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
      x: getRandomInRange(POSITION_MIN_X, POSITION_MAX_X),
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
var setAdressLocation = function (coordinateX, coordinateY) {
  coordinateX = Math.ceil(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
  coordinateY = Math.ceil(mainPin.offsetTop + MAIN_PIN_HEIGHT);
  address.value = coordinateX + ', ' + coordinateY;
};

// creates function for active state
var activateMap = function () {
  switchDisableAttribute(adFieldset, false);
  switchDisableAttribute(mapFieldset, false);
  switchDisableAttribute(mapSelect, false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  addPins();
};

// synchronizes the time of departure and entry
var onFieldValueChange = function (evt) {
  var target = evt.target;
  var selectedField = target === timeOut ? timeIn : timeOut;
  selectedField.value = target.value;
};

// synchronizes housing type and price
var onHousingTypeChange = function () {
  var minPriceOfType = typesOfHousing[offerType.value];

  price.min = minPriceOfType;
  price.placeholder = minPriceOfType;
};

// adds function to activate map and move the main pin
var onMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    var shift = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY
    };

    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    var currentCoordinateX = mainPin.offsetLeft - shift.x;
    var currentCoordinateY = mainPin.offsetTop - shift.y;

    if (currentCoordinateY <= POSITION_MIN_Y - MAIN_PIN_HEIGHT) {
      currentCoordinateY = POSITION_MIN_Y - MAIN_PIN_HEIGHT;
    }
    if (currentCoordinateY >= POSITION_MAX_Y - MAIN_PIN_HEIGHT) {
      currentCoordinateY = POSITION_MAX_Y - MAIN_PIN_HEIGHT;
    }
    if (currentCoordinateX <= POSITION_MIN_X) {
      currentCoordinateX = POSITION_MIN_X;
    }
    if (currentCoordinateX >= POSITION_MAX_X - MAIN_PIN_WIDTH) {
      currentCoordinateX = POSITION_MAX_X - MAIN_PIN_WIDTH;
    }

    mainPin.style.left = currentCoordinateX + 'px';
    mainPin.style.top = currentCoordinateY + 'px';

    setAdressLocation(currentCoordinateX, currentCoordinateY);
  };

  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();
    activateMap();


    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', onMouseDown);

switchDisableAttribute(adFieldset, true);
switchDisableAttribute(mapFieldset, true);
switchDisableAttribute(mapSelect, true);

timeIn.addEventListener('change', onFieldValueChange);
timeOut.addEventListener('change', onFieldValueChange);
offerType.addEventListener('change', onHousingTypeChange);
