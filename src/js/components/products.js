const catalogList = document.querySelector('.content-catalog__list')
const catalogMore = document.querySelector('.content-catalog__btn') //показать еще
const productModal = document.querySelector(
  '[data-target="product-modal"] .modal-content'
) //находим содержимое модалки с помощью дата-атрибута

const mainProdSlider = document.querySelector(
  '.item-left__mainslider .swiper-wrapper'
)
const subProdSlider = document.querySelector(
  '.item-left__subslider .swiper-wrapper'
)
const productTitle = document.querySelector('.item-right__title')
const productSizes = document.querySelector('.sizes__numbers')
const productPrices = document.querySelector('.item-right__prices')
const productDescr = document.querySelector('.product-description')
const productChars = document.querySelector('.product-chars')
const productVideo = document.querySelector('.product-modal__video')

let prodQuantity = 6 //число товаров по умолчанию
let dataLength = null //в этой переменной будет храниться общее число товаров

if (catalogList) {
  const loadProducts = (quantity = 8) => {
    fetch('../../data/data.json')
      .then((response) => {
        return response.json() //преобразует json в js
      })
      .then((data) => {
        console.log(data)

        dataLength = data.length

        catalogList.innerHTML = ''

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i]
            // console.log(item);
            catalogList.innerHTML += `
						<li class="content-catalog__item">
							<article class="product">
								<div class="product__image" tabindex="${item.id}">
									<img src="${item.mainImage}" alt="${item.title}">
									<div class="product__btns">
										<button class="btn-reset product__button open-modal-btn" data-id="${
                      item.id
                    }" data-path="product-modal" data-animation="fadeInUp" data-speed="500" aria-label="Показать информацию о товаре">
											<svg>
												<use xlink:href="img/sprite.svg#view"></use>
											</svg>
										</button>
										<button class="btn-reset product__button add-to-cart-btn" data-id="${
                      item.id
                    }" aria-label="Добавить товар в корзину">
											<svg>
												<use xlink:href="img/sprite.svg#catalog-cart"></use>
											</svg>
										</button>
									</div>
								</div>
								<h3 class="product__title">${item.title}</h3>
								<span class="product__price">${normalPrice(item.price)} р</span>
							</article>
						</li>
					`
            // console.log(item);
          }
        }
        cartLogic() //cart.js
      })
  }

  loadProducts(prodQuantity)

  const modal = new Modal({
    isOpen: (modal) => {
      console.log('opened')

      if (modal.modalContainer.classList.contains('product-modal')) {
        modal.modalContainer.parentElement.classList.add('_product')

        console.log(modal)

        // const openBtnId = modal.previousActiveElement.dataset.id не работает в safari

        const openBtnId = modal.activeBtnId //значение data-id кликнутого элемента

        console.log(openBtnId)

        loadModalData(openBtnId)
      }

      if (modal.modalContainer.classList.contains('cart-modal')) {
        modal.modalContainer.parentElement.classList.add('_cart')

        if (window.innerWidth <= 670) {
          let cart = document.querySelector('.header__cart')
          document
            .querySelector('.cart-header__wrapper')
            .classList.remove('_open')
          cart.classList.add('_hidden')

          // cart.style.display = 'none';
        }
      }
    },
    isClose: (modal) => {
      if (modal.modalContainer.classList.contains('cart-modal')) {
        modal.modalContainer.parentElement.classList.remove('_cart')

        if (infoOrderComposition.classList.contains('_open', '_is-open')) {
          infoOrderComposition.classList.remove('_open')
          orderAccordion.close()
        }

        if (num > 0) {
          printQuantity(num)
          topCartList.innerHTML = infoOrderList.innerHTML
          document.querySelector('.bottom-cart__price').textContent =
            document.querySelector(
              '.info-order__element._summ span'
            ).textContent
        }

        let cart = document.querySelector('.header__cart')
        cart.classList.remove('_hidden')
        // cart.style.display = 'block';
      }

      // productModal.innerHTML = '';//очищаем модалку перед загрузкой новых данных
      // productMainSlider.activeIndex = 0;
      if (modal.modalContainer.classList.contains('product-modal')) {
        mainProdSlider.innerHTML = ''
        subProdSlider.innerHTML = ''
        productTitle.innerHTML = ''
        productSizes.innerHTML = ''
        productPrices.innerHTML = ''
        productDescr.innerHTML = ''
        productChars.innerHTML = ''
        productVideo.innerHTML = ''
        if (window.innerWidth <= 767.98) {
          modal.modalContainer.parentElement.classList.remove('_product')
        }
      }

      console.log('closed')
    },
  })

  const loadModalData = (id = 1) => {
    fetch('../../data/data.json')
      .then((response) => {
        return response.json() //преобразует json в js
      })
      .then((data) => {
        // // productModal.innerHTML = '';//очищаем модалку перед загрузкой новых данных
        // mainProdSlider.innerHTML = '';
        // subProdSlider.innerHTML = '';
        // productTitle.innerHTML = '';
        // productSizes.innerHTML = '';
        // productPrices.innerHTML = '';
        // productDescr.innerHTML = '';
        // productChars.innerHTML = '';
        // productVideo.innerHTML = '';

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem)

            const mainSlides = dataItem.gallery.map((image) => {
              return `
							<div class="item-left__mainslide swiper-slide">
								<img src="${image}" alt="">
							</div>
						`
            })

            const subSlides = dataItem.gallery.map((image) => {
              return `
							<div class="item-left__subslide swiper-slide">
								<img src="${image}" alt="">
							</div>
						`
            })

            const sizes = dataItem.sizes.map((sizes) => {
              return `
							<button class="btn-reset sizes__number">${sizes}</button>
						`
            })

            let charsItems = ''
            Object.keys(dataItem.chars).forEach(function eachKey(key) {
              charsItems += `<p class="property-modal__text">${key}: ${dataItem.chars[key]}</p>`
            })

            mainProdSlider.innerHTML = mainSlides.join('')
            subProdSlider.innerHTML = subSlides.join('')
            productTitle.innerHTML = dataItem.title
            productSizes.innerHTML = sizes.join('')
            productPrices.innerHTML = `
						<span class="item-right__price">${dataItem.price}</span>
						${
              dataItem.oldPrice
                ? `<span class="item-right__old-price">${dataItem.oldPrice}</span>`
                : ''
            }
					`
            productDescr.textContent = dataItem.description
            productChars.innerHTML = charsItems
            if (dataItem.video) {
              productVideo.style.display = 'block'
              productVideo.innerHTML = `<iframe src="${dataItem.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            } else {
              productVideo.style.display = 'none'
            }
          }
        }
      })
  }

  catalogMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 3
    loadProducts(prodQuantity)

    if (prodQuantity >= dataLength) {
      setTimeout(() => {
        catalogMore.style.display = 'none'
      }, 100)
    }
  })
}
