/*Функция добавляет пробелы между разрядами числа*/
const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

/*Суммирует цену товаров*/
const plusFullPrice = (currentPrice) => {
  return (price += currentPrice)
}

/*Вычитает цену товаров*/
const minusFullPrice = (currentPrice) => {
  return (price -= currentPrice)
}

/*Убирает пробелы*/
const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '')
}

// const printFullPrice = () => {
// 	fullPrice.textContent = `${normalPrice(price)} ₽`;
// };

const printQuantity = (count) => {
  cartCount.textContent = count
}

const reOpenCartModal = () => {
  modal.close()
  modal._nextContainer = document.querySelector(`[data-target="cart-modal"]`)
  setTimeout(() => modal.open(), 1000)
}
