const topCartList = document.querySelector('.top-cart__list')
const cartCount = document.querySelector('.cart-header__btn-count')
const bottomCartWindow = document.querySelector('.window-cart__bottom')
let price = 0
let num = 0 //Число товаров в корзине

const infoOrderComposition = document.querySelector('.info-order__composition')
const cartBtn = document.querySelector('.cart-header__btn')
const cartWrapper = document.querySelector('.cart-header__wrapper')
const infoOrderList = document.querySelector('.info-order__list')
const quantityOrders = document.querySelector(
  '.info-order__element._quantity span'
)
const priceOrders = document.querySelector('.info-order__element._summ span')

//Работа корзины
const cartLogic = () => {
  const addToCartBtn = document.querySelectorAll('.add-to-cart-btn')
  addToCartBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id //получаем id кликнутого элимента
      loadCartData(id)
    })
  })
}

const loadCartData = (id = 1) => {
  fetch('../../data/data.json')
    .then((response) => {
      return response.json() //преобразует json в js
    })
    .then((data) => {
      for (let dataItem of data) {
        if (dataItem.id == id) {
          console.log(dataItem)
          topCartList.insertAdjacentHTML(
            'afterbegin',
            `
					<li class="cart-product__item" data-id="${dataItem.id}">
						<article class="cart-product">
							<div class="cart-product__img">
								<img src="${dataItem.mainImage}" alt="${dataItem.title}">
							</div>
							<div class="cart-product__wrapper">
								<h3 class="cart-product__title">${dataItem.title}</h3>
								<div class="cart-product__price">${normalPrice(dataItem.price)} ₽</div>
							</div>
							<button class="btn-reset cart-product__trash">
								<svg>
									<use xlink:href="img/sprite.svg#trash"></use>
								</svg>
							</button>
						</article>
					</li>
				`
          )
          return dataItem
        }
      }
    })
    .then((item) => {
      num++
      if (num > 0) {
        cartCount.classList.add('_visible')
        printQuantity(num)
        plusFullPrice(item.price)
        bottomCartWindow.innerHTML = `
				<div class="bottom-cart__final-price">
					<span class="bottom-cart__text">Итого:</span>
					<span class="bottom-cart__price">${normalPrice(price)} ₽</span>
				</div>
				<button class="btn-reset bottom-cart__btn btn" data-path="cart-modal">Перейти к оформлению</button>
			`
      }
    })
}

cartBtn.addEventListener('click', (e) => {
  let modalActive = document.querySelector('.modal.is-open')
  cartWrapper.classList.toggle('_open')
  if (window.innerWidth <= 510) {
    if (burgerIcon.classList.contains('_active')) {
      //Если меню-бургер открыто, то закрываю его
      burgerIcon.classList.remove('_active')
      menu.classList.remove('_active')
    } else if (!modalActive) {
      //Если модалка закрыта
      if (cartWrapper.classList.contains('_open')) {
        bodyDisableScroll()
      } else {
        bodyEnableScroll()
      }
    }
  }
})

document.addEventListener('click', (e) => {
  if (window.innerWidth > 767.98) {
    if (
      !e.target.closest('.cart-header__btn') &&
      !e.target.closest('.cart-header__wrapper') &&
      !e.target.closest('.product__button') &&
      !e.target.classList.contains('content-catalog__btn') &&
      !document.querySelector('.modal').classList.contains('is-open')
    ) {
      cartWrapper.classList.remove('_open') //корзина не закрывается, когда модалка открыта
    }
  } else if (window.innerWidth > 510) {
    if (
      !e.target.closest('.cart-header__btn') &&
      !e.target.closest('.cart-header__wrapper') &&
      !e.target.closest('.product__button') &&
      !e.target.classList.contains('content-catalog__btn') &&
      !document.querySelector('.modal').classList.contains('_cart')
    ) {
      cartWrapper.classList.remove('_open') //корзина закрывается, когда модалка на всю ширину
    }
  }
})

topCartList.addEventListener('click', (e) => {
  const self = e.target
  if (self.closest('.cart-product__trash')) {
    const parent = self.closest('.cart-product__item')
    const fullPrice = document.querySelector('.bottom-cart__price')
    /*Находим цену удаляемого из корзины товара и переводим ее в числовой вид без пробелов*/
    let removePrice = parseInt(
      priceWithoutSpaces(
        parent.querySelector('.cart-product__price').textContent
      )
    )
    console.log(removePrice)

    e.stopPropagation()
    parent.remove()
    minusFullPrice(removePrice)
    fullPrice.textContent = `${normalPrice(price)} ₽`
    // printFullPrice();
    num--
    if (num < 1) {
      cartCount.classList.remove('_visible')
      bottomCartWindow.innerHTML = `
				<h3 class="bottom-cart__empty">В корзине нет товаров</h3>
				<svg>
					<use xlink:href="img/sprite.svg#sad"></use>
				</svg>
			`
    } else {
      printQuantity(num)
    }
  }
})

cartWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('bottom-cart__btn')) {
    infoOrderList.innerHTML = topCartList.innerHTML
    quantityOrders.textContent = `${num} шт`
    priceOrders.textContent = document.querySelector(
      '.bottom-cart__price'
    ).textContent

    if (!infoOrderComposition.classList.contains('_open', '_is-open')) {
      infoOrderComposition.classList.add('_open')
      setTimeout(() => orderAccordion.open())
      //без setTimeout не работает scrollHeight, чтбы вычислить высоту элемента для плавного скрытия
    }
  }
})

infoOrderList.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-product__trash')) {
    let target = e.target
    const deleteElement = target.closest('.cart-product__item')
    let removePrice = parseInt(
      priceWithoutSpaces(
        deleteElement.querySelector('.cart-product__price').textContent
      )
    )
    e.stopPropagation() //Без этого при удалении элемента закрывается модалка.
    deleteElement.remove()

    num -= 1
    if (num > 0) {
      quantityOrders.textContent = `${num} шт`
      minusFullPrice(removePrice)
      priceOrders.textContent = `${normalPrice(price)} ₽`
    } else {
      modal.close()
      minusFullPrice(removePrice)
      cartCount.classList.remove('_visible')
      topCartList.innerHTML = ''
      bottomCartWindow.innerHTML = `
				<h3 class="bottom-cart__empty">В корзине нет товаров</h3>
				<svg>
					<use xlink:href="img/sprite.svg#sad"></use>
				</svg>
			`
    }
  }
})
