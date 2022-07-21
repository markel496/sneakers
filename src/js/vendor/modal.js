class Modal {
  constructor(options) {
    let defaultOptions = {
      //Объект с опциями по умолчанию
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options)
    /*связывает значения по-умолчанию и значения при вызове. Если при вызове значение меняется,
		то значение по умолчанию заменяется на новое*/
    this.modal = document.querySelector('.modal') //находим родителя всех модальных окон
    this.speed = 300 //время открытия окна по умолчанию
    this.animation = 'fade' //анимация по-умолчанию
    this._reOpen = false
    this._nextContainer = false
    this.modalContainer = false //модальное окно. Во время клика сюда будем передвать нужный элемент
    this.isOpen = false //открыто/не открыто окно
    this.activeBtnId = false
    this.previousActiveElement = false
    this._focusElements = [
      'a[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ]
    /*В этом массиве будут находится возможные фокусируемые элементы. По открытию модалки будем смотреть
		какие внутри нее есть фокусируемые элементы и первому элементу дадим фокус*/
    this._fixBlocks = document.querySelectorAll('.fix-block')
    this.events()
  }

  events() {
    //метод класса, в котором будут все события
    if (this.modal) {
      document.addEventListener(
        'click',
        function (e) {
          const clickedElement = e.target.closest(`[data-path]`) //находим кликнутый элемент с помощью data-атрибута
          if (clickedElement) {
            this.activeBtnId = clickedElement.dataset.id //узнаю значение data-id у кликнутого элемента
            let target = clickedElement.dataset.path //значение атрибута data-path у кликнутого элемента

            if (
              window.innerWidth < 767.98 &&
              this.isOpen === true &&
              target === 'cart-modal'
            ) {
              reOpenCartModal()
              setTimeout(
                () =>
                  infoOrderList.style.setProperty(
                    'max-height',
                    `${infoOrderList.scrollHeight}px`
                  ),
                1000
              )
              return
            }

            let animation = clickedElement.dataset.animation
            let speed = clickedElement.dataset.speed
            this.animation = animation ? animation : 'fade'
            //если значение анимации прописано в data-атрибуте - оно записывается в переменную, если нет - записывается fade
            this.speed = speed ? parseInt(speed) : 300 //parseInt переводит строку в число
            this._nextContainer = document.querySelector(
              `[data-target="${target}"]`
            )
            //нашли элемент, у которого значение data-target = значению data-path кликнутого элемента
            this.open()
            return
          }
        }.bind(this)
      )

      window.addEventListener(
        'keydown',
        function (e) {
          if (e.keyCode == 27 && this.isOpen) {
            //Если нажимаем на esc и открыта модалка
            this.close()
          }

          if (e.which == 9 && this.isOpen) {
            //Если нажали tab и открыта модалка
            this.focusCatch(e)
            return
          }
        }.bind(this)
      )

      this.modal.addEventListener(
        'click',
        function (e) {
          //закрытие модалки при клике вне ее области и при клике на крестик
          if (
            (!e.target.classList.contains('modal__container') &&
              !e.target.closest('.modal__container') &&
              this.isOpen) ||
            e.target.closest('.modal__close')
          ) {
            this.close()
          }
        }.bind(this)
      )
    }
  }

  open(selector) {
    this.previousActiveElement = document.activeElement
    //document.activeElement возвращает текущий сфокусированный элемент

    if (this.isOpen) {
      console.log(modal)
      this.reOpen = true
      this.close()
      return
    }

    this.modalContainer = this._nextContainer

    if (selector) {
      this.modalContainer = document.querySelector(
        `[data-target="${selector}"]`
      )
    }

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`)
    this.modal.classList.add('is-open')
    this.disableScroll()

    // this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation)

    setTimeout(() => {
      this.options.isOpen(this)
      this.modalContainer.classList.add('open-animate')
      this.isOpen = true
      this.focusTrap()
    }, this.speed)
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('open-animate')
      setTimeout(() => {
        this.modalContainer.classList.remove(this.animation)
        this.modal.classList.remove('is-open')
        // this.modalContainer.classList.remove('modal-open');

        this.enableScroll()
        this.options.isClose(this)
        this.isOpen = false
        this.focusTrap()
      }, this.speed)

      if (this.reOpen) {
        this.reOpen = false
        this.open()
      }
    }
  }

  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements)
    /*Нужно пройтись по этому массиву и найти индекс активного элемента. Перед этим его нужно
		  преобразовать из псевдо-массива в обычный массив*/
    const nodesArray = Array.prototype.slice.call(nodes) //преобразование nodes в настоящий массив
    const focusedItemIndex = nodesArray.indexOf(document.activeElement) //индекс активного элемента в массиве
    if (e.shiftKey && focusedItemIndex === 0) {
      //если нажали tab + shift и первый элемент массива был активен
      nodesArray[nodesArray.length - 1].focus()
      e.preventDefault()
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus()
      e.preventDefault()
    }
  }

  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements)
    /*Находим внутри модалки все элементы, которые совпадают с _focusElements*/
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus()
    } else {
      this.previousActiveElement.focus()
    }
  }

  disableScroll() {
    if (!document.body.classList.contains('disable-scroll')) {
      let pagePosition = window.scrollY //Текущее положение скролла
      this.lockPadding()
      document.body.classList.add('disable-scroll')
      document.body.dataset.position = pagePosition //<body data-position="">
      document.body.style.top = -pagePosition + 'px'
    }
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10) //в переменной числовое значение
    this.unlockPadding()
    document.body.style.top = null
    document.body.classList.remove('disable-scroll')
    window.scroll({
      top: pagePosition,
      left: 0,
    })
    document.body.removeAttribute('data-position')
  }

  lockPadding() {
    //Убирает прыжок при отключении скролла
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
    /*Узнаем ширину скролла. window.innerWidth - ширина всего окна с учетом скролла.
		document.body.offsetWidth - ширина окна без скролла*/
    console.log(paddingOffset)
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset
    })
    document.body.style.paddingRight = paddingOffset
  }

  unlockPadding() {
    this._fixBlocks.forEach((el) => {
      el.style.paddingRight = null
    })
    document.body.style.paddingRight = null
  }
}
