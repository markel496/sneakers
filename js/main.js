"use strict";

function bodyDisableScroll() {
  var pagePosition = window.scrollY; //Текущее положение скролла

  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition; //<body data-position="">

  body.style.top = -pagePosition + 'px';
}

;

function bodyEnableScroll() {
  var pagePosition = parseInt(document.body.dataset.position, 10); //в переменной числовое значение

  body.style.top = null;
  body.classList.remove('disable-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  body.removeAttribute('data-position');
}

;
"use strict";

/*Функция добавляет пробелы между разрядами числа*/
var normalPrice = function normalPrice(str) {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
/*Суммирует цену товаров*/


var plusFullPrice = function plusFullPrice(currentPrice) {
  return price += currentPrice;
};
/*Вычитает цену товаров*/


var minusFullPrice = function minusFullPrice(currentPrice) {
  return price -= currentPrice;
};
/*Убирает пробелы*/


var priceWithoutSpaces = function priceWithoutSpaces(str) {
  return str.replace(/\s/g, '');
}; // const printFullPrice = () => {
// 	fullPrice.textContent = `${normalPrice(price)} ₽`;
// };


var printQuantity = function printQuantity(count) {
  cartCount.textContent = count;
};

var reOpenCartModal = function reOpenCartModal() {
  modal.close();
  modal._nextContainer = document.querySelector("[data-target=\"cart-modal\"]");
  setTimeout(function () {
    return modal.open();
  }, 1000);
};
"use strict";

var burgerIcon = document.querySelector('.icon-menu');
var menu = document.querySelector('.header__nav');
var body = document.querySelector('body');
burgerIcon.addEventListener("click", function () {
  if (window.innerWidth > 510) {
    burgerIcon.classList.toggle('_active');
    menu.classList.toggle('_active');

    if (!body.classList.contains('disable-scroll')) {
      bodyDisableScroll();
    } else if (!document.querySelector('.modal').classList.contains('is-open')) {
      bodyEnableScroll();
    }
  } else {
    var modalActive = document.querySelector('.modal.is-open');

    if (cartWrapper.classList.contains('_open') && body.classList.contains('disable-scroll')) {
      cartWrapper.classList.remove('_open');
      burgerIcon.classList.add('_active');
      menu.classList.add('_active');
    } else {
      burgerIcon.classList.toggle('_active');
      menu.classList.toggle('_active');

      if (burgerIcon.classList.contains('_active') && !modalActive) {
        bodyDisableScroll();
      } else if (!modalActive) {
        bodyEnableScroll();
      }
    }
  }
});
menu.addEventListener("click", function (e) {
  if (menu.classList.contains('_active')) {
    if (e.target.classList.contains('header__link')) {
      burgerIcon.classList.toggle('_active');
      menu.classList.toggle('_active');

      if (!burgerIcon.classList.contains('_active')) {
        bodyEnableScroll();
      }
    }
  }
});
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var topCartList = document.querySelector('.top-cart__list');
var cartCount = document.querySelector('.cart-header__btn-count');
var bottomCartWindow = document.querySelector('.window-cart__bottom');
var price = 0;
var num = 0; //Число товаров в корзине

var infoOrderComposition = document.querySelector('.info-order__composition');
var cartBtn = document.querySelector('.cart-header__btn');
var cartWrapper = document.querySelector('.cart-header__wrapper');
var infoOrderList = document.querySelector('.info-order__list');
var quantityOrders = document.querySelector('.info-order__element._quantity span');
var priceOrders = document.querySelector('.info-order__element._summ span'); //Работа корзины

var cartLogic = function cartLogic() {
  var addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtn.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var id = e.currentTarget.dataset.id; //получаем id кликнутого элимента

      loadCartData(id);
    });
  });
};

var loadCartData = function loadCartData() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  fetch('data/data.json').then(function (response) {
    return response.json(); //преобразует json в js
  }).then(function (data) {
    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dataItem = _step.value;

        if (dataItem.id == id) {
          console.log(dataItem);
          topCartList.insertAdjacentHTML('afterbegin', "\n\t\t\t\t\t<li class=\"cart-product__item\" data-id=\"".concat(dataItem.id, "\">\n\t\t\t\t\t\t<article class=\"cart-product\">\n\t\t\t\t\t\t\t<div class=\"cart-product__img\">\n\t\t\t\t\t\t\t\t<img src=\"").concat(dataItem.mainImage, "\" alt=\"").concat(dataItem.title, "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"cart-product__wrapper\">\n\t\t\t\t\t\t\t\t<h3 class=\"cart-product__title\">").concat(dataItem.title, "</h3>\n\t\t\t\t\t\t\t\t<div class=\"cart-product__price\">").concat(normalPrice(dataItem.price), " \u20BD</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<button class=\"btn-reset cart-product__trash\">\n\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t<use xlink:href=\"img/sprite.svg#trash\"></use>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</article>\n\t\t\t\t\t</li>\n\t\t\t\t"));
          return dataItem;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }).then(function (item) {
    num++;

    if (num > 0) {
      cartCount.classList.add('_visible');
      printQuantity(num);
      plusFullPrice(item.price);
      bottomCartWindow.innerHTML = "\n\t\t\t\t<div class=\"bottom-cart__final-price\">\n\t\t\t\t\t<span class=\"bottom-cart__text\">\u0418\u0442\u043E\u0433\u043E:</span>\n\t\t\t\t\t<span class=\"bottom-cart__price\">".concat(normalPrice(price), " \u20BD</span>\n\t\t\t\t</div>\n\t\t\t\t<button class=\"btn-reset bottom-cart__btn btn\" data-path=\"cart-modal\">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E</button>\n\t\t\t");
    }
  });
};

cartBtn.addEventListener('click', function (e) {
  var modalActive = document.querySelector('.modal.is-open');
  cartWrapper.classList.toggle('_open');

  if (window.innerWidth <= 510) {
    if (burgerIcon.classList.contains('_active')) {
      //Если меню-бургер открыто, то закрываю его
      burgerIcon.classList.remove('_active');
      menu.classList.remove('_active');
    } else if (!modalActive) {
      //Если модалка закрыта
      if (cartWrapper.classList.contains('_open')) {
        bodyDisableScroll();
      } else {
        bodyEnableScroll();
      }
    }
  }
});
document.addEventListener('click', function (e) {
  if (window.innerWidth > 767.98) {
    if (!e.target.closest('.cart-header__btn') && !e.target.closest('.cart-header__wrapper') && !e.target.closest('.product__button') && !e.target.classList.contains('content-catalog__btn') && !document.querySelector('.modal').classList.contains('is-open')) {
      cartWrapper.classList.remove('_open'); //корзина не закрывается, когда модалка открыта
    }
  } else if (window.innerWidth > 510) {
    if (!e.target.closest('.cart-header__btn') && !e.target.closest('.cart-header__wrapper') && !e.target.closest('.product__button') && !e.target.classList.contains('content-catalog__btn') && !document.querySelector('.modal').classList.contains('_cart')) {
      cartWrapper.classList.remove('_open'); //корзина закрывается, когда модалка на всю ширину
    }
  }
});
topCartList.addEventListener('click', function (e) {
  var self = e.target;

  if (self.closest('.cart-product__trash')) {
    var parent = self.closest('.cart-product__item');
    var fullPrice = document.querySelector('.bottom-cart__price');
    /*Находим цену удаляемого из корзины товара и переводим ее в числовой вид без пробелов*/

    var removePrice = parseInt(priceWithoutSpaces(parent.querySelector('.cart-product__price').textContent));
    console.log(removePrice);
    e.stopPropagation();
    parent.remove();
    minusFullPrice(removePrice);
    fullPrice.textContent = "".concat(normalPrice(price), " \u20BD"); // printFullPrice();

    num--;

    if (num < 1) {
      cartCount.classList.remove('_visible');
      bottomCartWindow.innerHTML = "\n\t\t\t\t<h3 class=\"bottom-cart__empty\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432</h3>\n\t\t\t\t<svg>\n\t\t\t\t\t<use xlink:href=\"img/sprite.svg#sad\"></use>\n\t\t\t\t</svg>\n\t\t\t";
    } else {
      printQuantity(num);
    }
  }
});
cartWrapper.addEventListener('click', function (e) {
  if (e.target.classList.contains('bottom-cart__btn')) {
    infoOrderList.innerHTML = topCartList.innerHTML;
    quantityOrders.textContent = "".concat(num, " \u0448\u0442");
    priceOrders.textContent = document.querySelector('.bottom-cart__price').textContent;

    if (!infoOrderComposition.classList.contains('_open', '_is-open')) {
      infoOrderComposition.classList.add('_open');
      setTimeout(function () {
        return orderAccordion.open();
      }); //без setTimeout не работает scrollHeight, чтбы вычислить высоту элемента для плавного скрытия
    }
  }
});
infoOrderList.addEventListener('click', function (e) {
  if (e.target.classList.contains('cart-product__trash')) {
    var target = e.target;
    var deleteElement = target.closest('.cart-product__item');
    var removePrice = parseInt(priceWithoutSpaces(deleteElement.querySelector('.cart-product__price').textContent));
    e.stopPropagation(); //Без этого при удалении элемента закрывается модалка.

    deleteElement.remove();
    num -= 1;

    if (num > 0) {
      quantityOrders.textContent = "".concat(num, " \u0448\u0442");
      minusFullPrice(removePrice);
      priceOrders.textContent = "".concat(normalPrice(price), " \u20BD");
    } else {
      modal.close();
      minusFullPrice(removePrice);
      cartCount.classList.remove('_visible');
      topCartList.innerHTML = '';
      bottomCartWindow.innerHTML = "\n\t\t\t\t<h3 class=\"bottom-cart__empty\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432</h3>\n\t\t\t\t<svg>\n\t\t\t\t\t<use xlink:href=\"img/sprite.svg#sad\"></use>\n\t\t\t\t</svg>\n\t\t\t";
    }
  }
});
"use strict";

//vh некорректно работает в мобильных браузерах 
function windowHeightForMobile() {
  var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
}

;

if (window.innerWidth <= 510) {
  windowHeightForMobile();
  window.addEventListener('resize', function () {
    windowHeightForMobile();
  });
}
"use strict";

if (document.querySelector('.right-instagram__swiper')) {
  var instSliderInit = function instSliderInit() {
    if (!instSlider) {
      instSlider = new Swiper('.right-instagram__swiper', {
        slidesPerView: 1,
        effect: 'fade',
        speed: 700,
        observer: true,
        autoHeight: true,
        loop: true,
        spaceBetween: 15,
        autoplay: {
          delay: 3000
        }
      });
    }
  };

  var instSliderDestroy = function instSliderDestroy() {
    if (instSlider) {
      instSlider.destroy();
      instSlider = null;
    }
  };

  var instSlider = null;
  var mediaQuerySize = 767.98;
  ;
  ;

  if (screen.width <= mediaQuerySize) {
    instSliderInit();
  } else {
    instSliderDestroy();
  }

  window.addEventListener('resize', function (e) {
    var windowWidth = screen.width;

    if (windowWidth <= mediaQuerySize) {
      // Инициализировать слайдер если он ещё не был инициализирован
      instSliderInit();
    } else {
      // Уничтожить слайдер если он был инициализирован
      instSliderDestroy();
    }
  }, true);
}
"use strict";

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [59.939096, 30.315871],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 11
  });
  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: [59.903210, 30.511746]
    }
  });
  myMap.geoObjects.add(myGeoObject);
}
"use strict";

if (document.querySelector('.item-left__mainslider', '.item-left__subslider')) {
  var productSubSlider = new Swiper('.item-left__subslider', {
    slidesPerView: 3,
    speed: 700,
    observer: true,
    breakpoints: {
      // when window width is >= 600px
      400: {
        slidesPerView: 4 // spaceBetween: 20

      },
      600: {
        slidesPerView: 6 // spaceBetween: 20

      }
    }
  });
  var productMainSlider = new Swiper('.item-left__mainslider', {
    slidesPerView: 1,
    speed: 700,
    thumbs: {
      swiper: productSubSlider
    },
    observer: true
  });
}
"use strict";

var slider = document.getElementById('slider');
var priceStart = document.getElementById('price-start');
var priceEnd = document.getElementById('price-end');
var prices = [document.getElementById('price-start'), document.getElementById('price-end')];

if (slider) {
  var setPriceValues = function setPriceValues() {
    var priceStartValue;
    var priceEndValue;

    if (priceStart.value != '') {
      priceStartValue = priceStart.value;
    }

    if (priceEnd.value != '') {
      priceEndValue = priceEnd.value;
    }

    slider.noUiSlider.set([priceStartValue, priceEndValue]);
  };

  noUiSlider.create(slider, {
    start: [1850, 25768],
    connect: true,
    range: {
      'min': 1850,
      'max': 25768
    },
    step: 10
  });
  priceStart.addEventListener("click", function (e) {
    priceStart.select();
  });
  priceEnd.addEventListener("click", function (e) {
    priceEnd.select();
  });
  priceStart.addEventListener('change', setPriceValues);
  priceEnd.addEventListener('change', setPriceValues);
  slider.noUiSlider.on('update', function (values, handle) {
    prices[handle].value = Math.round(values[handle]);
  });
}
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var catalogList = document.querySelector('.content-catalog__list');
var catalogMore = document.querySelector('.content-catalog__btn'); //показать еще

var productModal = document.querySelector('[data-target="product-modal"] .modal-content'); //находим содержимое модалки с помощью дата-атрибута

var mainProdSlider = document.querySelector('.item-left__mainslider .swiper-wrapper');
var subProdSlider = document.querySelector('.item-left__subslider .swiper-wrapper');
var productTitle = document.querySelector('.item-right__title');
var productSizes = document.querySelector('.sizes__numbers');
var productPrices = document.querySelector('.item-right__prices');
var productDescr = document.querySelector('.product-description');
var productChars = document.querySelector('.product-chars');
var productVideo = document.querySelector('.product-modal__video');
var prodQuantity = 6; //число товаров по умолчанию

var dataLength = null; //в этой переменной будет храниться общее число товаров

if (catalogList) {
  var loadProducts = function loadProducts() {
    var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
    fetch('data/data.json').then(function (response) {
      return response.json(); //преобразует json в js
    }).then(function (data) {
      console.log(data);
      dataLength = data.length;
      catalogList.innerHTML = '';

      for (var i = 0; i < dataLength; i++) {
        if (i < quantity) {
          var item = data[i]; // console.log(item);

          catalogList.innerHTML += "\n\t\t\t\t\t\t<li class=\"content-catalog__item\">\n\t\t\t\t\t\t\t<article class=\"product\">\n\t\t\t\t\t\t\t\t<div class=\"product__image\" tabindex=\"".concat(item.id, "\">\n\t\t\t\t\t\t\t\t\t<img src=\"").concat(item.mainImage, "\" alt=\"").concat(item.title, "\">\n\t\t\t\t\t\t\t\t\t<div class=\"product__btns\">\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn-reset product__button open-modal-btn\" data-id=\"").concat(item.id, "\" data-path=\"product-modal\" data-animation=\"fadeInUp\" data-speed=\"500\" aria-label=\"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0442\u043E\u0432\u0430\u0440\u0435\">\n\t\t\t\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href=\"img/sprite.svg#view\"></use>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn-reset product__button add-to-cart-btn\" data-id=\"").concat(item.id, "\" aria-label=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\">\n\t\t\t\t\t\t\t\t\t\t\t<svg>\n\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href=\"img/sprite.svg#catalog-cart\"></use>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<h3 class=\"product__title\">").concat(item.title, "</h3>\n\t\t\t\t\t\t\t\t<span class=\"product__price\">").concat(normalPrice(item.price), " \u0440</span>\n\t\t\t\t\t\t\t</article>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t"); // console.log(item);
        }
      }

      cartLogic(); //cart.js
    });
  };

  loadProducts(prodQuantity);
  var modal = new Modal({
    isOpen: function isOpen(modal) {
      console.log('opened');

      if (modal.modalContainer.classList.contains('product-modal')) {
        modal.modalContainer.parentElement.classList.add('_product');
        console.log(modal); // const openBtnId = modal.previousActiveElement.dataset.id не работает в safari

        var openBtnId = modal.activeBtnId; //значение data-id кликнутого элемента

        console.log(openBtnId);
        loadModalData(openBtnId);
      }

      if (modal.modalContainer.classList.contains('cart-modal')) {
        modal.modalContainer.parentElement.classList.add('_cart');

        if (window.innerWidth <= 670) {
          var cart = document.querySelector('.header__cart');
          document.querySelector('.cart-header__wrapper').classList.remove('_open');
          cart.classList.add('_hidden'); // cart.style.display = 'none';
        }
      }
    },
    isClose: function isClose(modal) {
      if (modal.modalContainer.classList.contains('cart-modal')) {
        modal.modalContainer.parentElement.classList.remove('_cart');

        if (infoOrderComposition.classList.contains('_open', '_is-open')) {
          infoOrderComposition.classList.remove('_open');
          orderAccordion.close();
        }

        if (num > 0) {
          printQuantity(num);
          topCartList.innerHTML = infoOrderList.innerHTML;
          document.querySelector('.bottom-cart__price').textContent = document.querySelector('.info-order__element._summ span').textContent;
        }

        var cart = document.querySelector('.header__cart');
        cart.classList.remove('_hidden'); // cart.style.display = 'block';
      } // productModal.innerHTML = '';//очищаем модалку перед загрузкой новых данных
      // productMainSlider.activeIndex = 0;


      if (modal.modalContainer.classList.contains('product-modal')) {
        mainProdSlider.innerHTML = '';
        subProdSlider.innerHTML = '';
        productTitle.innerHTML = '';
        productSizes.innerHTML = '';
        productPrices.innerHTML = '';
        productDescr.innerHTML = '';
        productChars.innerHTML = '';
        productVideo.innerHTML = '';

        if (window.innerWidth <= 767.98) {
          modal.modalContainer.parentElement.classList.remove('_product');
        }
      }

      console.log('closed');
    }
  });

  var loadModalData = function loadModalData() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    fetch('data/data.json').then(function (response) {
      return response.json(); //преобразует json в js
    }).then(function (data) {
      // // productModal.innerHTML = '';//очищаем модалку перед загрузкой новых данных
      // mainProdSlider.innerHTML = '';
      // subProdSlider.innerHTML = '';
      // productTitle.innerHTML = '';
      // productSizes.innerHTML = '';
      // productPrices.innerHTML = '';
      // productDescr.innerHTML = '';
      // productChars.innerHTML = '';
      // productVideo.innerHTML = '';
      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        var _loop = function _loop() {
          var dataItem = _step.value;

          if (dataItem.id == id) {
            console.log(dataItem);
            var mainSlides = dataItem.gallery.map(function (image) {
              return "\n\t\t\t\t\t\t\t<div class=\"item-left__mainslide swiper-slide\">\n\t\t\t\t\t\t\t\t<img src=\"".concat(image, "\" alt=\"\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            });
            var subSlides = dataItem.gallery.map(function (image) {
              return "\n\t\t\t\t\t\t\t<div class=\"item-left__subslide swiper-slide\">\n\t\t\t\t\t\t\t\t<img src=\"".concat(image, "\" alt=\"\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
            });
            var sizes = dataItem.sizes.map(function (sizes) {
              return "\n\t\t\t\t\t\t\t<button class=\"btn-reset sizes__number\">".concat(sizes, "</button>\n\t\t\t\t\t\t");
            });
            var charsItems = '';
            Object.keys(dataItem.chars).forEach(function eachKey(key) {
              charsItems += "<p class=\"property-modal__text\">".concat(key, ": ").concat(dataItem.chars[key], "</p>");
            });
            mainProdSlider.innerHTML = mainSlides.join('');
            subProdSlider.innerHTML = subSlides.join('');
            productTitle.innerHTML = dataItem.title;
            productSizes.innerHTML = sizes.join('');
            productPrices.innerHTML = "\n\t\t\t\t\t\t<span class=\"item-right__price\">".concat(dataItem.price, "</span>\n\t\t\t\t\t\t").concat(dataItem.oldPrice ? "<span class=\"item-right__old-price\">".concat(dataItem.oldPrice, "</span>") : '', "\n\t\t\t\t\t");
            productDescr.textContent = dataItem.description;
            productChars.innerHTML = charsItems;

            if (dataItem.video) {
              productVideo.style.display = 'block';
              productVideo.innerHTML = "<iframe src=\"".concat(dataItem.video, "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
            } else {
              productVideo.style.display = 'none';
            }
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  };

  catalogMore.addEventListener('click', function (e) {
    prodQuantity = prodQuantity + 3;
    loadProducts(prodQuantity);

    if (prodQuantity >= dataLength) {
      setTimeout(function () {
        catalogMore.style.display = 'none';
      }, 100);
    }
  });
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
1. Вывести квиз на страницу;
2. Обработчики кликов на кнопки;
3. Переход к следующему вопросу;
4. Валидация (нельзя не заполнить какое-то поле);
5. Добавление к отправке;
5.1 Сбор данных;
6. Отправка данных.
*/
var quizData = [{
  //Массив объектов
  number: 1,
  title: "Какой тип обуви рассматриваете?",
  answer_alias: "type of shoes",
  answers: [{
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кроссовки",
    type: "checkbox"
  }, {
    answer_title: "сланцы",
    type: "checkbox"
  }, {
    answer_title: "берцы",
    type: "checkbox"
  }, {
    answer_title: "говнотопы",
    type: "checkbox"
  }, {
    answer_title: "Зимняя обувь",
    type: "checkbox"
  }]
}, {
  number: 2,
  title: "Какой размер вам подойдет?",
  answer_alias: "size",
  answers: [{
    answer_title: "менее 36",
    type: "radio"
  }, {
    answer_title: "36-38",
    type: "radio"
  }, {
    answer_title: "39-41",
    type: "radio"
  }, {
    answer_title: "42-44",
    type: "radio"
  }, {
    answer_title: "45 и больше",
    type: "radio"
  }]
}, {
  number: 3,
  title: "Уточните какие-либо моменты",
  answer_alias: "comments",
  answers: [{
    answer_title: "Введите сообщение",
    type: "textarea"
  }]
}]; //console.log(quizData.length);

var quizTemplate = function quizTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dataLength = arguments.length > 1 ? arguments[1] : undefined;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var number = data.number,
      title = data.title; //Достали number и title из data

  var prevBtnText = options.prevBtnText,
      nextBtnText = options.nextBtnText; //Выводим ответы
  //map - метод массива, с помощью которого можно вызвать функцию, обработать ее и вывести
  //Создаем переменную item

  var answers = data.answers.map(function (item) {
    //Выводим разметку
    if (number === 1) {
      return "\n\t\t\t<li>\n\t\t\t\t<label class=\"form-question__label\">\n\t\t\t\t\t<div class=\"form-question__img\">\n\t\t\t\t\t\t<img src=\"img/sneak01.jpg\" alt=\"\">\n\t\t\t\t\t</div>\t\n\t\t\t\t\t<input type=\"".concat(item.type, "\" data-valid=\"false\" class=\"form-question__answer ").concat(item.type !== 'text' ? "checkbox" : '', "\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n\t\t\t\t\t<span class=\"").concat(item.type !== 'text' ? "checkbox__text" : '', "\">").concat(item.answer_title, "</span>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t");
    }

    if (number === 2) {
      return "\n\t\t\t<li>\n\t\t\t\t<label class=\"form-question__label\">\t\n\t\t\t\t\t<input type=\"".concat(item.type, "\" data-valid=\"false\" class=\"form-question__answer ").concat(item.type !== 'text' ? "checkbox" : '', "\" name=\"").concat(data.answer_alias, "\" ").concat(item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : '', " value=\"").concat(item.type !== 'text' ? item.answer_title : '', "\">\n\t\t\t\t\t<span class=\"").concat(item.type !== 'text' ? "checkbox__text" : '', "\">").concat(item.answer_title, "</span>\n\t\t\t\t</label>\n\t\t\t</li>\n\t\t\t");
    }

    if (item.type === "textarea") {
      return "\n\t\t\t\t<textarea class=\"form-question__textarea\" name=\"".concat(data.answer_alias, "\" placeholder=\"").concat(item.answer_title, "\"></textarea>\n\t\t\t");
    } // data-valid="false" - для того, чтобы понять валидное поле или нет (ввели что-то или нет)
    // ${item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : '' - Если тип текст, то придумываем placeholder, если не текст, то placeholder не пишем

  });

  if (number !== 3) {
    return " \n\t\t\t<div class=\"quiz-form__question form-question\">\n\t\t\t\t<h2 class=\"form-question__title\">".concat(title, "</h2>\n\t\t\t\t<ul class=\"form-question__answers ").concat(number === 2 ? "_flex" : '', "\">\n\t\t\t\t\t").concat(answers.join(''), "\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"form-question__bg\" style=\"").concat(number === 2 ? "display: block;" : "display: none;", "\">\n\t\t\t\t\t<img src=\"img/quiz-bg.jpg\" alt=\"\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-question__bottom\">\n\t\t\t\t\t<div class=\"quiz-form__questions\">").concat(number, " \u0438\u0437 ").concat(dataLength, "</div>\n\t\t\t\t\t<button type=\"button\" class=\"btn-reset form-question__btn btn\" data-prev-btn>").concat(prevBtnText, "</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn-reset form-question__btn btn\" data-next-btn>").concat(nextBtnText, "</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
  } else {
    return "\n\t\t\t<div class=\"quiz-form__question form-question\">\n\t\t\t\t<h2 class=\"form-question__title\">".concat(title, "</h2>\n\t\t\t\t").concat(answers.join(''), "\n\t\t\t\t<div class=\"form-question__bottom\">\n\t\t\t\t\t<div class=\"quiz-form__questions\">").concat(number, " \u0438\u0437 ").concat(dataLength, "</div>\n\t\t\t\t\t<button type=\"button\" class=\"btn-reset form-question__btn btn\" data-prev-btn>").concat(prevBtnText, "</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn-reset form-question__btn btn\" data-send-btn>\u0414\u0430\u043B\u0435\u0435</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
  } //<div class="quiz__questions"></div> - Здесь указывается какой вопрос из скольки
  //${number} = ${data.number} благодаря const {number, title} = data;
  //type="button" потому что находимся в форме и отправлять пока ничего не нужно, а по умолчанию тип submit
  //data-next-btn для того, чтобы понять, что кнопка "далее", используется в методе events()
  //answers.join('') - .join('') убирает запятые

}; // const quiz = document.querySelector(".quiz");
// quiz.innerHTML = quizTemplate(quizData[0], quizData.length);


var Quiz = /*#__PURE__*/function () {
  function Quiz(selector, data, options) {
    _classCallCheck(this, Quiz);

    //Указываем что будет приходить при вызове
    this.$el = document.querySelector(selector); //находим .quiz

    this.options = options;
    this.data = data;
    this.counter = 0; // quizData[0] вместо 0 - counter

    this.dataLength = this.data.length;
    this.resultArray = [];
    this.tmp = {}; //Объект для временного хранения данных

    this.init(); //функция, которая будет показывать квиз

    this.events(); //
  }

  _createClass(Quiz, [{
    key: "init",
    value: function init() {
      console.log("init!");
      this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
      this.$el.querySelector('[data-prev-btn]').style.display = 'none';
    }
  }, {
    key: "events",
    value: function events() {
      var _this = this;

      this.$el.addEventListener('click', function (e) {
        if (e.target == _this.$el.querySelector('[data-prev-btn]')) {
          _this.removeToSend();

          _this.prevQuestion();
        }
      });
      this.$el.addEventListener('click', function (e) {
        if (e.target == _this.$el.querySelector('[data-next-btn]')) {
          if (_this.valid()) {
            _this.addToSend(); //записываем данные перед переходом к следующему вопросу


            _this.nextQuestion();
          }
        }

        if (e.target == document.querySelector('[data-send-btn]')) {
          if (_this.valid()) {
            _this.addToSend();

            _this.send();
          }
        }
      });
      this.$el.addEventListener('input', function (e) {
        if (e.target.tagName == 'INPUT') {
          //Если change выполняется у <input>
          if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
            var elements = _this.$el.querySelectorAll('input'); //находим все <input>


            elements.forEach(function (el) {
              //проходим по всем инпутам и удаляем класс error
              if (el.type !== "text") {
                var sibling = el.nextElementSibling;
                sibling.classList.remove('error');
              } else {
                el.classList.remove('error');
              }
            });
            elements.forEach(function (el) {
              return el.checked = false;
            }); //проходим по всем инпутам и сбрасываем checked
          }
        } // this.tmp = this.serialize(this.$el);//в tmp помещаются данные при помощи функции serialize
        // console.log(this.tmp);

      });
      this.$el.addEventListener('change', function (e) {
        if (e.target.type == 'checkbox' || e.target.type == 'radio') {
          var elements = _this.$el.querySelectorAll('input'); //находим все <input>


          elements.forEach(function (el) {
            //проходим по всем инпутам и удаляем класс error
            if (el.type !== "text") {
              var sibling = el.nextElementSibling;
              sibling.classList.remove('error');
            } else {
              el.classList.remove('error');
            }
          });

          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.type == 'text') {
              element.value = '';
            }
          }
        }

        _this.tmp = _this.serialize(_this.$el); //в tmp помещаются данные при помощи функции serialize

        console.log(_this.tmp);
      });
    }
  }, {
    key: "prevQuestion",
    value: function prevQuestion() {
      console.log("prev question!");
      this.counter--;
      this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
      var quizOffset = document.querySelector('.quiz').offsetTop - 64; //вычитаю высоту хедера

      window.scrollTo({
        top: quizOffset,
        behavior: 'smooth',
      });

      if (this.counter == 0) {
        this.$el.querySelector('[data-prev-btn]').style.display = 'none';
      }
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      console.log("next question!");

      if (this.counter !== 0) {
        this.$el.querySelector('[data-prev-btn]').style.display = 'inline-block';
      }

      if (this.counter < this.dataLength) {
        this.counter++;
        this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
        var quizOffset = document.querySelector('.quiz').offsetTop - 64; //вычитаю высоту хедера

        window.scrollTo({
          top: quizOffset,
          behavior: 'smooth',
        });
      }
    }
  }, {
    key: "valid",
    value: function valid() {
      //Валидация
      var isValid = false; //Переменная возвращается из данной функции; по умолчанию - false

      var elements = this.$el.querySelectorAll('input'); //находим все <input>

      elements.forEach(function (el) {
        //Проходим по всем элементам
        var sibling = el.nextElementSibling;

        switch (el.type) {
          case 'text':
            //Если input текстовый и мы что-то ввели - isValid = true, если нет - элементу присваиваем класс error
            el.value ? isValid = true : el.classList.add('error');

          case 'checkbox':
            el.checked ? isValid = true : sibling.classList.add('error');

          case 'radio':
            el.checked ? isValid = true : sibling.classList.add('error');
        }
      });
      var textarea = this.$el.querySelector('.form-question__textarea');

      if (textarea) {
        isValid = true;

        if (textarea.value === '') {
          this.tmp = '';
        }
      }

      return isValid;
    }
  }, {
    key: "removeToSend",
    value: function removeToSend() {
      var removeElement = this.resultArray.pop();
      console.log("Удаленный элемент: %o", removeElement);
    }
  }, {
    key: "addToSend",
    value: function addToSend() {
      //Подготовка к отправке
      this.resultArray.push(this.tmp); //добавляем объекты из tmp в resultArray
    }
  }, {
    key: "send",
    value: function send() {
      var _this2 = this;

      console.log('send!');
      console.log(this.resultArray); // let elements = this.$el.querySelectorAll('input');//находим все <input>
      // elements.forEach(el => {//проходим по всем инпутам и удаляем класс error
      // 	if (el.type !== "text") {
      // 		let sibling = el.nextElementSibling;
      // 		sibling.classList.remove('error');
      // 	} else {
      // 		el.classList.remove('error');
      // 	}
      // });

      document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!';
      document.querySelector('.quiz__descr').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';
      this.$el.style.display = 'none';
      document.querySelector('.quiz-form').innerHTML = "\n\t\t\t<div class=\"quiz-form__collection collection-quiz\">\n\t\t\t\t<h3 class=\"collection-quiz__title _title\">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</h3>\n\t\t\t\t<p class=\"collection-quiz__descr\">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0434\u043B\u044F \u0432\u0430\u0441 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043D\u0430 \u043F\u043E\u0447\u0442\u0443</p>\n\t\t\t\t<input required name=\"name\" type=\"text\" placeholder=\"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F\" class=\"collection-quiz__input\" data-name-input>\n\t\t\t\t<input required name=\"email\" type=\"email\" placeholder=\"E-mail\" class=\"collection-quiz__input\" data-email-input>\n\t\t\t\t<button type=\"button\" class=\"btn-reset collection-quiz__btn btn\">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C</button>\n\t\t\t\t<div class=\"collection-quiz__img\">\n\t\t\t\t\t<img src=\"img/iphone.png\" alt=\"\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
      document.querySelector('.collection-quiz__btn').addEventListener('click', function (e) {
        var name = document.querySelector('[data-name-input]');
        var email = document.querySelector('[data-email-input]');
        var data = {
          Name: name.value,
          "E-mail": email.value
        }; //Попробовал объект data поделить на 2 объекта и записать объекты в resultArray

        var newData = Object.entries(data);
        newData.map(function (arr) {
          var obj = arr.reduce(function (newObj, item, index) {
            if (index === 0) {
              newObj[item] = arr[index + 1];
            }

            return newObj;
          }, {});

          _this2.resultArray.push(obj);
        });
        console.log(_this2.resultArray);
        var formData = new FormData(); //Создаем переменную formData в которую вызовем новый экземпляр объекта FormData
        //Проходимся по resultArray, получаем каждый элемент этого массива

        var _iterator = _createForOfIteratorHelper(_this2.resultArray),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            for (var obj in item) {
              formData.append(obj, item[obj].substring(0, item[obj].length - 1)); //https://developer.mozilla.org/ru/docs/Web/API/FormData/append#возвращает
            }
          } // const response = fetch('mail.php', {
          // 	method: 'POST',
          // 	body: formData
          // });

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
  }, {
    key: "serialize",
    value: function serialize(element) {
      //Помещает все данные c инпутов в один объект
      var form = element.parentElement; //находим форму

      var field,
          s = {};
      var valueString = '';

      if (_typeof(form) == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
          field = form.elements[i];

          if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
            if (field.type == 'select-multiple') {
              for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
              }
            } else if (field.type != 'checkbox' && field.type != 'radio' && field.value || field.checked) {
              // valueString += field.value + ',';
              valueString += field.value + ' ';
              s[field.name] = valueString;
            }
          }
        }
      }

      return s;
    }
  }]);

  return Quiz;
}();

window.quiz = new Quiz('.quiz-form .quiz-form__content', quizData, {
  prevBtnText: "Назад",
  nextBtnText: "Следующий шаг"
});
"use strict";

var catalog = document.querySelector('.catalog');
var about = document.querySelector('.about');
var quiz = document.querySelector('.quiz');
var team = document.querySelector('.team');
var faq = document.querySelector('.faq');
var contacts = document.querySelector('.contacts');

function scrollToTargetAdjusted(element) {
  var modalActive = document.querySelector('.modal.is-open');
  var headerOffset = 64; //высота хедера

  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  if (modalActive) {
    //закрываю модалку если открыта
    var modalActiveContainer = modalActive.querySelector('.modal__container.open-animate');

    if (modalActiveContainer.classList.contains('product-modal')) {
      modalActiveContainer.className = 'modal__container product-modal';
    } else {
      if (modalActiveContainer.classList.contains('cart-modal')) {
        modalActiveContainer.className = 'modal__container cart-modal';
        document.querySelector('.header__cart').classList.remove('_hidden');
      }
    }

    modalActive.className = 'modal';
    modal.isOpen = false; //modal.js

    document.body.style.paddingRight = null;
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.scrollTo({
      top: offsetPosition,
      behavior: "auto"
    });
  } else {
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

document.addEventListener('click', function (e) {
  if (e.target.hasAttribute('data-catalog')) {
    e.preventDefault();
    scrollToTargetAdjusted(catalog);
  }

  if (e.target.hasAttribute('data-about')) {
    e.preventDefault();
    scrollToTargetAdjusted(about);
  }

  if (e.target.hasAttribute('data-quiz')) {
    e.preventDefault();
    scrollToTargetAdjusted(quiz);
  }

  if (e.target.hasAttribute('data-team')) {
    e.preventDefault();
    scrollToTargetAdjusted(team);
  }

  if (e.target.hasAttribute('data-faq')) {
    e.preventDefault();
    scrollToTargetAdjusted(faq);
  }

  if (e.target.hasAttribute('data-contacts')) {
    e.preventDefault();
    scrollToTargetAdjusted(contacts);
  }
});
"use strict";

var tooltip = document.querySelector('.tooltip');

if (tooltip) {
  document.addEventListener('click', function (e) {
    var target = e.target;

    if (target.closest('.tooltip') && !target.closest('._tooltip-open')) {
      tooltip.classList.add('_tooltip-open');
    } else if (!target.closest('.tooltip__text') && target.closest('._tooltip-open') || !target.closest('._tooltip-open')) {
      tooltip.classList.remove('_tooltip-open');
    }
  });
}
"use strict";
//# sourceMappingURL=main.js.map
