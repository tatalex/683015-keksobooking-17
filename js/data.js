'use strict';

(function () {
  var ESC_CODE = 27;
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');

  var onError = function () {
    main.appendChild(errorMessage);

    errorButton.addEventListener('click', function () {
      main.removeChild(errorMessage);
    });
    errorMessage.addEventListener('click', function () {
      main.removeChild(errorMessage);
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        main.removeChild(errorMessage);
      }
    });
  };

  var onSuccess = function (objects) {
    window.utils.getRandomId(objects);
    window.pin.updatePins(objects);
    window.filters.filterPin(objects);
  };

  window.data = {
    ESC_CODE: ESC_CODE,
    onError: onError,
    onSuccess: onSuccess
  };
})();
