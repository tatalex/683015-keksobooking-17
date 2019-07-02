'use strict';

(function () {
  var ADS_AMOUNT = 8;
  var ESC_CODE = 27;
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');

  var onError = function () {
    main.appendChild(errorMessage);

    errorButton.addEventListener('click', function () {
      main.removeChild(errorMessage)
    });
    errorMessage.addEventListener('click', function () {
      main.removeChild(errorMessage)
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        main.removeChild(errorMessage);
      }
    });
  };

  var onSuccess = function (objects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_AMOUNT; i++) {
      fragment.appendChild(window.pin.renderPin(objects[i]));
    }
    window.allMapPins.appendChild(fragment);
  };

  window.data = {
    onError: onError,
    onSuccess: onSuccess
  };
})();
