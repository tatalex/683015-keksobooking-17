'use strict';


(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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


  var renderCard = function (card, id) {
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
    cardOfMap.classList.dataId = id;
    return cardOfMap;
  };

  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      var card = renderCard(cards[i], i);
      pinCards.push(card);
      fragment.appendChild(card);
    }
    return fragment;
  };

  // code for listeners
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      pinCards.forEach(function (card) {
        card.classList.add('hidden');
      });
    }
  };

  var onClosePopup = function () {
    pinCards.forEach(function (card) {
      card.classList.add('hidden');
    });
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var addCards = function (objects) {
    // render the cards
    var fragments = renderCards(objects);

    // add open logic
    var pinsWithoutMain = window.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsWithoutMain.length; i++) {
      pinsWithoutMain[i].addEventListener('click', function (event) {
        pinCards.forEach(function (card) {
          card.classList.add('hidden');
        });
        pinCards[getDataId(event)].classList.remove('hidden');

        var closeButton = document.querySelectorAll('.popup__close');
        closeButton.forEach(function (button) {
          button.addEventListener('click', onClosePopup);
        });

        document.addEventListener('keydown', onPopupEscPress);
      });
    }

    return fragments;
  };

  var getDataId = function (evt) {
    if (evt.target.tagName === 'IMG') {
      var id = evt.target.offsetParent.dataId;
    } else {
      id = evt.target.dataId;
    }
    return id;
  };


  window.card = {
    addCards: addCards
  };
})();
