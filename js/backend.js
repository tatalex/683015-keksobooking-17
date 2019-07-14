'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT_CODE = 10000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  var storedtData = function (onSuccess, onError, method, url) {
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

    xhr.open(method, url);
    return xhr;
  };

  var getStoredtData = function (onSuccess, onError) {
    var xhr = storedtData(onSuccess, onError, 'GET', GET_URL);
    xhr.send();
  };

  var sendStoredtData = function (data, onSuccess, onError) {
    var xhr = storedtData(onSuccess, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  window.backend = {
    getStoredtData: getStoredtData,
    sendStoredtData: sendStoredtData
  };
})();
