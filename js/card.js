'use strict';


(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = map.querySelector('.map__filters-container');
  var cardOfMap = cardTemplate.cloneNode(true);
  var housingTypeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var featureOfHouseMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var createPhotos = function (item, arr) {
    arr.forEach(function (element) {
      var image = item.querySelector('img').cloneNode(true);
      image.src = element;
      return item.appendChild(image);
    });
    item.removeChild(item.querySelectorAll('img')[0]);
  };

  var createFeatures = function (item, arr) {
    item.textContent = '';
    arr.forEach(function (element) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', featureOfHouseMap[element]);
      return item.appendChild(li);
    });
  };


  var renderCard = function (card) {
    cardOfMap.querySelector('img').src = card.author.avatar;
    cardOfMap.querySelector('.popup__title').textContent = card.offer.title;
    cardOfMap.querySelector('.popup__text--address').textContent = card.offer.address;
    cardOfMap.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardOfMap.querySelector('.popup__type').textContent = housingTypeMap[card.offer.type];
    cardOfMap.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardOfMap.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardOfMap.querySelector('.popup__description').textContent = card.offer.description;
    createPhotos(cardOfMap.querySelector('.popup__photos'), card.offer.photos);
    createFeatures(cardOfMap.querySelector('.popup__features'), card.offer.features);

    return cardOfMap;
  };

  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();
    cards.slice(0, 1).forEach(function (card) {
      return fragment.appendChild(renderCard(card));
    });
    window.map.insertBefore(cardOfMap, filtersContainer);

    return fragment;
  };

  window.card = {
    renderCards: renderCards
  };
})();
