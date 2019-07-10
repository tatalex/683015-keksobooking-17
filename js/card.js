'use strict';


(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var filtersContainer = window.map.querySelector('.map__filters-container');
  // var popupMapCard = document.querySelector('.popup');
  // var closeButton = document.querySelector('.popup__close');
  var pinCards = [];
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
    var cardOfMap = cardTemplate.cloneNode(true);
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
    cardOfMap.classList.add('hidden');
    return cardOfMap;
  };

  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      var card = renderCard(cards[i]);
      pinCards.push(card);
      fragment.appendChild(card);
    }
    return fragment;
  };

  /* code for listeners

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      popupMapCard.classList.add('hidden');
    }
  };

  var onClosePopup = function () {
    popupMapCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onOpenPopup = function () {
    popupMapCard.classList.remove('hidden');
  };*/

  var addCards = function (objects) {
    var fragments = renderCards(objects);

    var pinsWithoutMain = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsWithoutMain.length; i++) {
      pinsWithoutMain[i].addEventListener('click', function (pin) {
        pinCards.forEach(function (card) {
          card.classList.add('hidden');
        });

        pinCards[pin.path[1].id].classList.remove('hidden');
      });
    }
    return fragments;
  };


  window.card = {
    addCards: addCards
  };
})();
