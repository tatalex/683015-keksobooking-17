'use strict';

(function () {
  var TYPE_DEFAULT_VALUE = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var filteredAds = window.backend.getStoredData;
  var houseTypeFilter = document.querySelector('#housing-type');

  var filterByType = function (type) {
    var refreshedAds = filteredAds;
    refreshedAds = type === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.type === type;
    });
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
