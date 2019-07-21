'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFieldset = adForm.querySelectorAll('fieldset');
  var mapSelect = mapFilters.querySelectorAll('select');
  var mapFieldset = mapFilters.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var selectRooms = adForm.querySelector('select[name="rooms"]');
  var selectCapacity = adForm.querySelector('select[name="capacity"]');
  var capacityOption = selectCapacity.querySelectorAll('option');
  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessage = successTemplate.cloneNode(true);
  var errorMessage = errorTemplate.cloneNode(true);
  var main = document.querySelector('main');
  var errorButton = errorTemplate.querySelector('.error__button');

  var numberOfVisitors = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var TYPES_OF_HOUSING = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  // synchronizes the time of departure and entry
  var onFieldValueChange = function (evt) {
    var target = evt.target;
    var selectedField = target === timeOut ? timeIn : timeOut;
    selectedField.value = target.value;
  };

  // synchronizes housing type and price
  var onHousingTypeChange = function () {
    var minPriceOfType = TYPES_OF_HOUSING[offerType.value];

    price.min = minPriceOfType;
    price.placeholder = minPriceOfType;
  };

  // adds location to address field
  var setAdressLocation = function (coordinateX, coordinateY) {
    coordinateX = Math.ceil(window.mainPin.offsetLeft + window.PinSize.MAIN_PIN_WIDTH / 2);
    coordinateY = Math.ceil(window.mainPin.offsetTop + window.PinSize.MAIN_PIN_HEIGHT);
    address.value = coordinateX + ', ' + coordinateY;
  };

  var onRoomsCountChange = function () {
    capacityOption.forEach(function (element) {
      element.disabled = !numberOfVisitors[selectRooms.value].includes(element.value);
    });

    selectCapacity.value = numberOfVisitors[selectRooms.value].includes(selectCapacity.value) ? selectCapacity.value : numberOfVisitors[selectRooms.value][0];
  };

  var removeStatusMessage = function (evt, message) {
    if (evt.type === 'click' || evt.keyCode === window.ESC_CODE) {
      main.removeChild(message);
      document.removeEventListener('keydown', removeStatusMessage);
      document.removeEventListener('click', removeStatusMessage);
    }
  };

  var onSuccessSend = function () {
    main.appendChild(successMessage);
    window.maps.onResetPage();

    document.addEventListener('click', function (evt) {
      removeStatusMessage(evt, successMessage);
    });
    document.addEventListener('keydown', function (evt) {
      removeStatusMessage(evt, successMessage);
    });
  };

  var onErrorSend = function () {
    main.appendChild(errorMessage);

    document.addEventListener('click', function (evt) {
      removeStatusMessage(evt, errorMessage);
    });
    document.addEventListener('keydown', function (evt) {
      removeStatusMessage(evt, errorMessage);
    });
    errorButton.addEventListener('click', function (evt) {
      removeStatusMessage(evt, errorMessage);
    });
  };

  onRoomsCountChange();
  setAdressLocation();
  selectRooms.addEventListener('change', onRoomsCountChange);
  window.utils.switchDisableAttribute(adFieldset, true);
  window.utils.switchDisableAttribute(mapFieldset, true);
  window.utils.switchDisableAttribute(mapSelect, true);
  timeIn.addEventListener('change', onFieldValueChange);
  timeOut.addEventListener('change', onFieldValueChange);
  offerType.addEventListener('change', onHousingTypeChange);
  resetForm.addEventListener('click', window.maps.onResetPage);
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendStoredtData(new FormData(adForm), onSuccessSend, onErrorSend);
  });

  window.adForm = adForm;
  window.mapFieldset = mapFieldset;
  window.mapSelect = mapSelect;
  window.adFieldset = adFieldset;

  window.form = {
    setAdressLocation: setAdressLocation
  };
})();
