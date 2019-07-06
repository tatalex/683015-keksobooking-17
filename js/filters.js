'use strict';

(function () {
  var filteredAds = window.backend.getStoredData;
  var houseTypeFilter = document.querySelector('#housing-type');
  var TYPE_DEFAULT_VALUE = 'any';

  var filterByType = function (type) {
    var refreshedAds = filteredAds;
    if (type !== TYPE_DEFAULT_VALUE) {
      refreshedAds = refreshedAds.filter(function (it) {
        return it.offer.type === type;
      });
    }
    window.pin.updatePins(refreshedAds);
  };

  var pinFilter = function (data) {
    filteredAds = data;

    houseTypeFilter.addEventListener('change', function (evt) {
      filterByType(evt.target.value);
    });
  };

  window.filters = {
    pinFilter: pinFilter
  };
})();
