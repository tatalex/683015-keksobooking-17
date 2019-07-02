'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT_CODE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';

  var onUpload = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_CODE;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    onUpload: onUpload
  };
})();
