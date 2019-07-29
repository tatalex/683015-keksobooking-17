'use strict';

(function () {
  var TYPE_DEFAULT_VALUE = 'any';
  var adsData = window.backend.getStoredData;
  var filtersOfMap = document.querySelector('.map__filters');
  var filterFieldset = filtersOfMap.querySelectorAll('fieldset');
  var filterSelect = filtersOfMap.querySelectorAll('select');
  var filterInput = filtersOfMap.querySelectorAll('input');
  var PriceRange = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterByFields = function () {
    var refreshedAds = adsData;

    var housingType = document.querySelector('#housing-type').value;
    refreshedAds = housingType === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.type === housingType;
    });

    var priceRange = document.querySelector('#housing-price').value;
    refreshedAds = priceRange === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      if (priceRange === 'middle') {
        return it.offer.price >= PriceRange.LOW && it.offer.price <= PriceRange.HIGH;
      }

      if (priceRange === 'low') {
        return it.offer.price < PriceRange.LOW;
      }

      if (priceRange === 'high') {
        return it.offer.price > PriceRange.HIGH;
      }
      return true;
    });

    var housingRooms = document.querySelector('#housing-rooms').value;
    refreshedAds = housingRooms === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.rooms === parseInt(housingRooms, 10);
    });

    var housingGuests = document.querySelector('#housing-guests').value;
    refreshedAds = housingGuests === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.guests === parseInt(housingGuests, 10);
    });

    var features = filtersOfMap.querySelectorAll('input[name="features"]:checked');
    var featuresOfFilter = [];

    features.forEach(function (elem) {
      featuresOfFilter.push(elem.value);
    });

    refreshedAds = featuresOfFilter === featuresOfFilter.length > 0 ? refreshedAds : refreshedAds.filter(function (it) {
      return featuresOfFilter.every(function (item) {
        return it.offer.features.indexOf(item) > -1;
      });
    });

    var filteredPins = window.pin.updatePins(refreshedAds);
    window.utils.debounce(filteredPins);
  };

  var filterPin = function (data) {
    adsData = data;

    filtersOfMap.addEventListener('change', function () {
      window.card.closePopup();
      filterByFields();
    });
  };

  window.utils.switchDisableAttribute(filterFieldset, true);
  window.utils.switchDisableAttribute(filterSelect, true);
  window.utils.switchDisableAttribute(filterInput, true);

  window.filters = {
    filtersOfMap: filtersOfMap,
    filterFieldset: filterFieldset,
    filterSelect: filterSelect,
    filterInput: filterInput,
    filterPin: filterPin
  };
})();
