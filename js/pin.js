'use strict';

(function () {
  var ADS_AMOUNT = 5;
  var mainPin = document.querySelector('.map__pin--main');
  var allMapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var pins = [];

  var LimitLocation = {
    POSITION_MAX_Y: 630,
    POSITION_MIN_Y: 130,
    POSITION_MAX_X: map.offsetWidth,
    POSITION_MIN_X: 0
  };

  var PinSize = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65
  };

  // renders pin
  var renderPin = function (ad, id) {
    var pinOfMap = pinTemplate.cloneNode(true);

    pinOfMap.style.left = (ad.location.x - PinSize.PIN_WIDTH / 2) + 'px';
    pinOfMap.style.top = (ad.location.y - PinSize.PIN_HEIGHT) + 'px';
    pinOfMap.querySelector('img').src = ad.author.avatar;
    pinOfMap.querySelector('img').alt = ad.offer.title;
    pinOfMap.dataId = id;
    return pinOfMap;
  };

  var renderPins = function (objects) {
    var fragment = document.createDocumentFragment();
    var quantity = objects.length < ADS_AMOUNT ? objects.length : ADS_AMOUNT;
    for (var i = 0; i < quantity; i++) {
      if (objects[i] && objects[i].offer) {
        var pin = renderPin(objects[i], objects[i].id);
        pins.push(pin);
        fragment.appendChild(pin);
      }
    }
    return fragment;
  };

  var removePins = function () {
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var updatePins = function (objects) {
    removePins();
    allMapPins.appendChild(renderPins(objects));
    allMapPins.appendChild(window.card.addCards(objects));
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

      if (currentCoordinateY <= LimitLocation.POSITION_MIN_Y - PinSize.MAIN_PIN_HEIGHT) {
        currentCoordinateY = LimitLocation.POSITION_MIN_Y - PinSize.MAIN_PIN_HEIGHT;
      }
      if (currentCoordinateY >= LimitLocation.POSITION_MAX_Y - PinSize.MAIN_PIN_HEIGHT) {
        currentCoordinateY = LimitLocation.POSITION_MAX_Y - PinSize.MAIN_PIN_HEIGHT;
      }
      if (currentCoordinateX <= LimitLocation.POSITION_MIN_X) {
        currentCoordinateX = LimitLocation.POSITION_MIN_X;
      }
      if (currentCoordinateX >= LimitLocation.POSITION_MAX_X - PinSize.MAIN_PIN_WIDTH) {
        currentCoordinateX = LimitLocation.POSITION_MAX_X - PinSize.MAIN_PIN_WIDTH;
      }

      mainPin.style.left = currentCoordinateX + 'px';
      mainPin.style.top = currentCoordinateY + 'px';

      window.form.setAdressLocation(currentCoordinateX, currentCoordinateY);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      window.maps.onActivateMap();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMouseDown);


  window.mainPin = mainPin;
  window.map = map;
  window.pins = pins;
  window.allMapPins = allMapPins;
  window.LimitLocation = {
    POSITION_MAX_Y: 630,
    POSITION_MIN_Y: 130,
    POSITION_MAX_X: map.offsetWidth,
    POSITION_MIN_X: 0
  };
  window.PinSize = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65
  };

  window.pin = {
    updatePins: updatePins,
    renderPin: renderPin,
    renderPins: renderPins,
    removePins: removePins
  };
})();
