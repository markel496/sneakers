class Accordion {
  constructor(selector, options) {
    let defaultOptions = {
      /*Создаем 2 события, которые будем вызывать, когда аккордеон открывается или закрывается*/
      isOpen: () => {},
      isClose: () => {},
      speed: 300, //Скорость открытия аккордеона
    }

    this.options = Object.assign(defaultOptions, options)
    /*Совмещает defaultOptions и options. Если значение speed передали в options при вызове класса,
		то speed из defaultOptions меняется на то, которое передали*/
    this.accordion = document.querySelector(selector) //ищем аккордеон
    this.control = this.accordion.querySelector('._accordion-control')
    this.content = this.accordion.querySelector('._accordion-content')
    this.accordion.style.setProperty(
      '--accordion-time',
      `${this.options.speed / 1000}s`
    )

    this.event()
  }

  event() {
    if (this.accordion) {
      this.accordion.addEventListener('click', (e) => {
        if (e.target.closest('._accordion-control')) {
          this.accordion.classList.toggle('_open')
          if (this.accordion.classList.contains('_open')) {
            this.open()
          } else if (!this.content.style.maxHeight) {
            this.content.style.maxHeight = this.content.scrollHeight + 'px'
            setTimeout(() => this.close())
          } else {
            this.close()
          }
        }
      })
    }
  }

  open() {
    // this.accordion.style.setProperty('--accordion-time', `${this.options.speed / 1000}s`);
    this.accordion.classList.add('_is-open')
    this.control.setAttribute('aria-expanded', true)
    this.content.setAttribute('aria-hidden', false)
    // this.content.style.maxHeight = this.content.scrollHeight + 'px';
    this.content.style.setProperty(
      'max-height',
      `${this.content.scrollHeight}px`
    )
    this.options.isOpen(this)
  }

  close() {
    this.accordion.classList.remove('_is-open')
    this.control.setAttribute('aria-expanded', false)
    this.content.setAttribute('aria-hidden', true)
    this.content.style.setProperty('max-height', 0)
    // this.content.style.maxHeight = 0;
    this.options.isClose(this)
  }
}

const faqAccordion1 = new Accordion('.accordion-1', {
  isOpen: (acc) => {
    console.log(acc)
  },
  isClose: (acc) => {
    console.log(acc)
  },
})

const faqAccordion2 = new Accordion('.accordion-2')

const orderAccordion = new Accordion('._orderAccordion', {
  isClose: (acc) => {
    console.log(acc)
  },
})

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi),type (min, max)"
// e.x. data-da="item,767,last,max"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

class DynamicAdapt {
  // массив объектов
  elementsArray = [];
  daClassname = '_dynamic_adapt_';

  constructor(type) {
    this.type = type;
  }

  init() {
    // массив DOM-элементов
    this.elements = [...document.querySelectorAll('[data-da]')];

    // наполнение elementsArray объктами
    this.elements.forEach((element) => {
      const data = element.dataset.da.trim();
      if (data !== '') {
        const dataArray = data.split(',');

        const oElement = {};
        oElement.element = element;
        oElement.parent = element.parentNode;
        oElement.destination = document.querySelector(`.${dataArray[0].trim()}`);
        oElement.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        oElement.place = dataArray[2] ? dataArray[2].trim() : 'last';

        oElement.index = this.indexInParent(
          oElement.parent, oElement.element,
        );

        this.elementsArray.push(oElement);
      }
    });

    this.arraySort(this.elementsArray);

    // массив уникальных медиа-запросов
    this.mediaArray = this.elementsArray
      .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaArray.forEach((media) => {
      const mediaSplit = media.split(',');
      const mediaQuerie = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const elementsFilter = this.elementsArray.filter(
        ({ breakpoint }) => breakpoint === mediaBreakpoint
      );
      mediaQuerie.addEventListener('change', () => {
        this.mediaHandler(mediaQuerie, elementsFilter);
      });
      this.mediaHandler(mediaQuerie, elementsFilter);
    });
  }

  // Основная функция
  mediaHandler(mediaQuerie, elementsFilter) {
    if (mediaQuerie.matches) {
      elementsFilter.forEach((oElement) => {
        // получение индекса внутри родителя
        oElement.index = this.indexInParent(
          oElement.parent, oElement.element,
        );
        this.moveTo(oElement.place, oElement.element, oElement.destination);
      });
    } else {
      elementsFilter.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index);
        }
      });
    }
  }

  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
      return;
    }
    if (place === 'first') {
      destination.prepend(element);
      return;
    }
    destination.children[place].before(element);
  }

  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  // Функция получения индекса внутри родителя
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1;
          }
          return a.place - b.place;
        }
        return a.breakpoint - b.breakpoint;
      });
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1;
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1;
          }
          return b.place - a.place;
        }
        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  }
}

const da = new DynamicAdapt('max');
da.init();
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
