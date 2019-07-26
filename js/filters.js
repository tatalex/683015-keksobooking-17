'use strict';

(function () {
  var TYPE_DEFAULT_VALUE = 'any';
  var filteredAds = window.backend.getStoredData;
  var featuresFilter = document.querySelectorAll('.map__filter');
  var checkboxFilter = document.querySelectorAll('input.map__checkbox');
  var PriceRange = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterByFields = function () {
    var refreshedAds = filteredAds;
    var housingType = document.querySelector('#housing-type').value;
    refreshedAds = housingType === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.type === housingType;
    });

    var priceRange = document.querySelector('#housing-price').value;
    refreshedAds = priceRange === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      if (priceRange === 'middle'){
        return it.offer.price >= PriceRange.LOW && it.offer.price <= PriceRange.HIGH;
      }

      if (priceRange === 'low'){
        return it.offer.price < PriceRange.LOW;
      }

      if (priceRange === 'high'){
        return it.offer.price > PriceRange.HIGH;
      }
    });

    var housingRooms = document.querySelector('#housing-rooms').value;
    refreshedAds = housingRooms === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.rooms === parseInt(housingRooms, 10);
    });

    var housingGuests = document.querySelector('#housing-guests').value;
    refreshedAds = housingGuests === TYPE_DEFAULT_VALUE ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.guests === parseInt(housingGuests, 10);
    });

    var featureWifi = document.querySelector('#filter-wifi').checked;
    refreshedAds = featureWifi === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('wifi');
    });

    var featureDishwasher = document.querySelector('#filter-dishwasher').checked;
    refreshedAds = featureDishwasher === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('dishwasher');
    });

    var featureParking = document.querySelector('#filter-parking').checked;
    refreshedAds = featureParking === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('parking');
    });

    var featureWasher = document.querySelector('#filter-washer').checked;
    refreshedAds = featureWasher === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('washer');
    });

    var featureElevator = document.querySelector('#filter-elevator').checked;
    refreshedAds = featureElevator === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('elevator');
    });

    var featureConditioner = document.querySelector('#filter-conditioner').checked;
    refreshedAds = featureConditioner === false ? refreshedAds : refreshedAds.filter(function (it) {
      return it.offer.features.includes('conditioner');
    });


    window.pin.updatePins(refreshedAds);
  };

  var pinFilter = function (data) {
    filteredAds = data;

    featuresFilter.forEach(function(filter){
      filter.addEventListener('change', function (evt) {
        window.card.onClosePopup();
        filterByFields();
      });
    });
    checkboxFilter.forEach(function(filter){
      filter.addEventListener('change', function (evt) {
        window.card.onClosePopup();
        filterByFields();
      });
    });

  };



  window.filters = {
    pinFilter: pinFilter
  };
})();
