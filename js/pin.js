'use strict';

(function () {
  var ADS_AMOUNT = 8;
  var mainPin = document.querySelector('.map__pin--main');
  var allMapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var firstActivation = true;

  var POSITION_MAX_Y = 630;
  var POSITION_MIN_Y = 130;

  var POSITION_MAX_X = map.offsetWidth;
  var POSITION_MIN_X = 0;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  window.mainPin = mainPin;
  window.map = map;
  window.ADS_AMOUNT = ADS_AMOUNT;
  window.POSITION_MAX_X = POSITION_MAX_X;
  window.POSITION_MIN_X = POSITION_MIN_X;
  window.POSITION_MAX_Y = POSITION_MAX_Y;
  window.POSITION_MIN_Y = POSITION_MIN_Y;
  window.MAIN_PIN_WIDTH = MAIN_PIN_WIDTH;
  window.MAIN_PIN_HEIGHT = MAIN_PIN_HEIGHT;

  // renders pin
  var renderPin = function (ad) {
    var pinOfMap = pinTemplate.cloneNode(true);
    pinOfMap.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
    pinOfMap.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
    pinOfMap.querySelector('img').src = ad.author.avatar;
    pinOfMap.querySelector('img').alt = ad.offer.type;

    return pinOfMap;
  };

  // adds pins to the map and removes pins
  var addPins = function () {
    var adsCollection = window.cards.generateAds(ADS_AMOUNT);
    for (var i = 0; i < adsCollection.length; i++) {
      fragment.appendChild(renderPin(adsCollection[i]));
    }

    allMapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pinsList = allMapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsList.length; i++) {
      allMapPins.removeChild(pinsList[i]);
    }
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

      window.form.setAdressLocation(currentCoordinateX, currentCoordinateY);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      window.maps.activateMap();

      if (firstActivation) {
        addPins();
        firstActivation = false;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMouseDown);

  window.pin = {
    removePins: removePins
  };
})();
