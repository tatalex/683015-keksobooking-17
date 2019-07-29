'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFieldset = adForm.querySelectorAll('fieldset');
  var adSelect = adForm.querySelectorAll('select');
  var adInput = adForm.querySelectorAll('input');
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
  var typesOfHousing = {
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
    var minPriceOfType = typesOfHousing[offerType.value];

    price.min = minPriceOfType;
    price.placeholder = minPriceOfType;
  };

  // adds location to address field
  var setAdressLocation = function (coordinateX, coordinateY) {
    coordinateX = Math.ceil(window.pin.mainPin.offsetLeft + window.pin.PinSize.MAIN_PIN_WIDTH / 2);
    coordinateY = Math.ceil(window.pin.mainPin.offsetTop + window.pin.PinSize.MAIN_PIN_HEIGHT);
    address.value = coordinateX + ', ' + coordinateY;
  };

  var onRoomsCountChange = function () {
    capacityOption.forEach(function (element) {
      element.disabled = !numberOfVisitors[selectRooms.value].includes(element.value);
    });

    selectCapacity.value = numberOfVisitors[selectRooms.value].includes(selectCapacity.value) ? selectCapacity.value : numberOfVisitors[selectRooms.value][0];
  };

  var removeStatusMessage = function (evt, message) {
    if (evt.type === 'click' || evt.keyCode === window.data.ESC_CODE) {
      main.removeChild(message);
      document.removeEventListener('keydown', removeStatusMessage);
      document.removeEventListener('click', removeStatusMessage);
    }
  };

  var onSuccessSend = function () {
    main.appendChild(successMessage);
    window.map.onResetPage();

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

  setAdressLocation();
  window.utils.switchDisableAttribute(adFieldset, true);
  window.utils.switchDisableAttribute(adInput, true);
  window.utils.switchDisableAttribute(adSelect, true);
  resetForm.addEventListener('click', window.map.onResetPage);
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sendStoredtData(new FormData(adForm), onSuccessSend, onErrorSend);
  });

  window.form = {
    adForm: adForm,
    adInput: adInput,
    adSelect: adSelect,
    adFieldset: adFieldset,
    selectRooms: selectRooms,
    timeIn: timeIn,
    timeOut: timeOut,
    offerType: offerType,
    setAdressLocation: setAdressLocation,
    onFieldValueChange: onFieldValueChange,
    onHousingTypeChange: onHousingTypeChange,
    onRoomsCountChange: onRoomsCountChange
  };
})();
