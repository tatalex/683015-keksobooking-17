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
    objects.forEach(function(obj){
      obj.id = Math.random().toString(36).substr(2, 9);
    });
    window.pin.updatePins(objects);
    window.filters.pinFilter(objects);
  };

  window.ESC_CODE = 27;

  window.data = {
    onError: onError,
    onSuccess: onSuccess
  };
})();
