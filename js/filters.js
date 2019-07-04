'use strict';

(function () {
  var StartAds;
  var filteredAds;
  var houseTypeFilter = document.querySelector('#housing-type');
  var TYPE_DEFAULT_VALUE = 'any';

  var filterByType = function (type) {
    var refreshedAds;
    if (type === TYPE_DEFAULT_VALUE) {
      refreshedAds = StartAds;
    } else {
      refreshedAds = filteredAds.filter(function (it) {
        return it.offer.type === type;
      });
    }
    window.pin.updatePins(refreshedAds);
  };

  var pinFilter = function (data) {
    StartAds = data;
    filteredAds = data;

    houseTypeFilter.addEventListener('change', function (evt) {
      var type = evt.target.value;
      filterByType(type);
    });
  };

  window.filters = {
    pinFilter: pinFilter
  };
})();
