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
