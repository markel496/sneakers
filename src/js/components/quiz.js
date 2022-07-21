/*
1. Вывести квиз на страницу;
2. Обработчики кликов на кнопки;
3. Переход к следующему вопросу;
4. Валидация (нельзя не заполнить какое-то поле);
5. Добавление к отправке;
5.1 Сбор данных;
6. Отправка данных.
*/

const quizData = [{//Массив объектов
	number: 1,
	title: "Какой тип обуви рассматриваете?",
	answer_alias: "type of shoes",
	answers: [{
			answer_title: "кеды",
			type: "checkbox"
		},
		{
			answer_title: "кроссовки",
			type: "checkbox"
		},
		{
			answer_title: "сланцы",
			type: "checkbox"
		},
		{
			answer_title: "берцы",
			type: "checkbox"
		},
		{
			answer_title: "говнотопы",
			type: "checkbox"
		},
		{
			answer_title: "Зимняя обувь",
			type: "checkbox"
		}
	]
},
{
	number: 2,
	title: "Какой размер вам подойдет?",
	answer_alias: "size",
	answers: [{
			answer_title: "менее 36",
			type: "radio"
		},
		{
			answer_title: "36-38",
			type: "radio"
		},
		{
			answer_title: "39-41",
			type: "radio"
		},
		{
			answer_title: "42-44",
			type: "radio"
		},
		{
			answer_title: "45 и больше",
			type: "radio"
		}
	]
},
{
	number: 3,
	title: "Уточните какие-либо моменты",
	answer_alias: "comments",
	answers: [{
		answer_title: "Введите сообщение",
		type: "textarea"
	}]
}
];

//console.log(quizData.length);





const quizTemplate = (data = [], dataLength, options) => {

	const {number, title} = data; //Достали number и title из data
	const{prevBtnText, nextBtnText} = options;

	//Выводим ответы
	//map - метод массива, с помощью которого можно вызвать функцию, обработать ее и вывести
	//Создаем переменную item
	const answers = data.answers.map(item => {
		//Выводим разметку
		if (number === 1) {
			return `
			<li>
				<label class="form-question__label">
					<div class="form-question__img">
						<img src="../img/sneak01.jpg" alt="">
					</div>	
					<input type="${item.type}" data-valid="false" class="form-question__answer ${item.type !== 'text' ? "checkbox" : ''}" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
					<span class="${item.type !== 'text' ? "checkbox__text" : ''}">${item.answer_title}</span>
				</label>
			</li>
			`;
		}
		if (number === 2) {
			return `
			<li>
				<label class="form-question__label">	
					<input type="${item.type}" data-valid="false" class="form-question__answer ${item.type !== 'text' ? "checkbox" : ''}" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
					<span class="${item.type !== 'text' ? "checkbox__text" : ''}">${item.answer_title}</span>
				</label>
			</li>
			`;
		}
		if (item.type === "textarea") {
			return `
				<textarea class="form-question__textarea" name="${data.answer_alias}" placeholder="${item.answer_title}"></textarea>
			`;
		}

		// data-valid="false" - для того, чтобы понять валидное поле или нет (ввели что-то или нет)
		// ${item.type == 'text' ? 'placeholder="Введите Ваш вариант"' : '' - Если тип текст, то придумываем placeholder, если не текст, то placeholder не пишем
	});

	if (number !== 3) {
		return ` 
			<div class="quiz-form__question form-question">
				<h2 class="form-question__title">${title}</h2>
				<ul class="form-question__answers ${number === 2 ? "_flex" : ''}">
					${answers.join('')}
				</ul>
				<div class="form-question__bg" style="${number === 2 ? "display: block;" : "display: none;"}">
					<img src="../img/quiz-bg.jpg" alt="">
				</div>
				<div class="form-question__bottom">
					<div class="quiz-form__questions">${number} из ${dataLength}</div>
					<button type="button" class="btn-reset form-question__btn btn" data-prev-btn>${prevBtnText}</button>
					<button type="button" class="btn-reset form-question__btn btn" data-next-btn>${nextBtnText}</button>
				</div>
			</div>
		`;
	} else {
		return `
			<div class="quiz-form__question form-question">
				<h2 class="form-question__title">${title}</h2>
				${answers.join('')}
				<div class="form-question__bottom">
					<div class="quiz-form__questions">${number} из ${dataLength}</div>
					<button type="button" class="btn-reset form-question__btn btn" data-prev-btn>${prevBtnText}</button>
					<button type="button" class="btn-reset form-question__btn btn" data-send-btn>Далее</button>
				</div>
			</div>
		`;
	}

		//<div class="quiz__questions"></div> - Здесь указывается какой вопрос из скольки
		//${number} = ${data.number} благодаря const {number, title} = data;
		//type="button" потому что находимся в форме и отправлять пока ничего не нужно, а по умолчанию тип submit
		//data-next-btn для того, чтобы понять, что кнопка "далее", используется в методе events()
		//answers.join('') - .join('') убирает запятые
};


// const quiz = document.querySelector(".quiz");
// quiz.innerHTML = quizTemplate(quizData[0], quizData.length);

class Quiz {
	constructor(selector, data, options) {//Указываем что будет приходить при вызове
		this.$el = document.querySelector(selector);//находим .quiz
		this.options = options;
		this.data = data;
		this.counter = 0;// quizData[0] вместо 0 - counter
		this.dataLength = this.data.length;
		this.resultArray = [];
		this.tmp = {};//Объект для временного хранения данных
		this.init();//функция, которая будет показывать квиз
		this.events();//
	}

	init() {
		console.log("init!");
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
		this.$el.querySelector('[data-prev-btn]').style.display = 'none';
	}

	events() {
		this.$el.addEventListener('click', (e) => {
			if (e.target == this.$el.querySelector('[data-prev-btn]')) {
				this.removeToSend()
				this.prevQuestion();
			}
		});

		this.$el.addEventListener('click', (e) => {
			if (e.target == this.$el.querySelector('[data-next-btn]')) {
				if (this.valid()) {
					this.addToSend();//записываем данные перед переходом к следующему вопросу
					this.nextQuestion();
				}	
			}

			if (e.target == document.querySelector('[data-send-btn]')) {
				if (this.valid()) {
					this.addToSend();
					this.send();
				}
			}
		});

		this.$el.addEventListener('input', (e) => {
			if (e.target.tagName == 'INPUT') { //Если change выполняется у <input>
				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
					let elements = this.$el.querySelectorAll('input');//находим все <input>

					elements.forEach(el => {//проходим по всем инпутам и удаляем класс error
						if (el.type !== "text") {
							let sibling = el.nextElementSibling;
							sibling.classList.remove('error');
						} else {
							el.classList.remove('error');
						}
					});
					elements.forEach(el => el.checked = false);//проходим по всем инпутам и сбрасываем checked
				}
			}
			// this.tmp = this.serialize(this.$el);//в tmp помещаются данные при помощи функции serialize
			// console.log(this.tmp);
		});

		this.$el.addEventListener('change', (e) => {
			if (e.target.type == 'checkbox' || e.target.type == 'radio') {
				let elements = this.$el.querySelectorAll('input');//находим все <input>
				
				elements.forEach(el => {//проходим по всем инпутам и удаляем класс error
					if (el.type !== "text") {
						let sibling = el.nextElementSibling;
						sibling.classList.remove('error');
					} else {
						el.classList.remove('error');
					}
				});
				for (let i = 0; i < elements.length; i++) {
					let element = elements[i];
					if (element.type == 'text') {
						element.value = '';
					}
				}
			}
			this.tmp = this.serialize(this.$el);//в tmp помещаются данные при помощи функции serialize
			console.log(this.tmp);
		});	
	}

	prevQuestion() {
		console.log("prev question!");
		this.counter--;
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
		let quizOffset = document.querySelector('.quiz').offsetTop - 64;//вычитаю высоту хедера
		window.scroll(0, quizOffset);

		if (this.counter == 0) {
			this.$el.querySelector('[data-prev-btn]').style.display = 'none';
		}
	}

	nextQuestion() {
		console.log("next question!");
		if (this.counter !== 0) {
			this.$el.querySelector('[data-prev-btn]').style.display = 'inline-block';
		}

		if (this.counter < this.dataLength) {
			this.counter++;
			this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
			let quizOffset = document.querySelector('.quiz').offsetTop - 64;//вычитаю высоту хедера
			window.scroll(0, quizOffset);
		}
	}

	valid() {//Валидация
		let isValid = false;//Переменная возвращается из данной функции; по умолчанию - false
		let elements = this.$el.querySelectorAll('input');//находим все <input>
		elements.forEach(el => {//Проходим по всем элементам
			let sibling = el.nextElementSibling;
			switch(el.type) {
				case 'text': //Если input текстовый и мы что-то ввели - isValid = true, если нет - элементу присваиваем класс error
				(el.value) ? isValid = true : el.classList.add('error');
				case 'checkbox':
				(el.checked) ? isValid = true : sibling.classList.add('error');
				case 'radio':
				(el.checked) ? isValid = true : sibling.classList.add('error');
			}
		});
		let textarea = this.$el.querySelector('.form-question__textarea');
		if (textarea) {
			isValid = true;
			if (textarea.value === '') {
				this.tmp = '';
			}
		}

		return isValid;
	}

	removeToSend() {
		var removeElement = this.resultArray.pop();
		console.log("Удаленный элемент: %o", removeElement);
	}

	addToSend() {//Подготовка к отправке
		this.resultArray.push(this.tmp);//добавляем объекты из tmp в resultArray
	}

	send() {
		console.log('send!');
		console.log(this.resultArray);

		// let elements = this.$el.querySelectorAll('input');//находим все <input>
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
		document.querySelector('.quiz-form').innerHTML = 
		`
			<div class="quiz-form__collection collection-quiz">
				<h3 class="collection-quiz__title _title">Получить предложение</h3>
				<p class="collection-quiz__descr">Получите подборку подходящих для вас моделей на почту</p>
				<input required name="name" type="text" placeholder="Ваше имя" class="collection-quiz__input" data-name-input>
				<input required name="email" type="email" placeholder="E-mail" class="collection-quiz__input" data-email-input>
				<button type="button" class="btn-reset collection-quiz__btn btn">Получить</button>
				<div class="collection-quiz__img">
					<img src="../img/iphone.png" alt="">
				</div>
			</div>
		`
	
		document.querySelector('.collection-quiz__btn').addEventListener('click', (e) => {
			let name = document.querySelector('[data-name-input]');
			let email = document.querySelector('[data-email-input]');
			const data = {
    			Name: name.value,
    			"E-mail": email.value
    		};

    		//Попробовал объект data поделить на 2 объекта и записать объекты в resultArray
    		let newData = Object.entries(data);

    		newData.map(arr => {
    			let obj = arr.reduce((newObj, item, index) => {
    				if (index === 0) {
    					newObj[item] = arr[index + 1];
    				}
				  	return newObj;
				}, {});
				this.resultArray.push(obj);
    		});
    	
    		console.log(this.resultArray)


    		const formData = new FormData();//Создаем переменную formData в которую вызовем новый экземпляр объекта FormData

			//Проходимся по resultArray, получаем каждый элемент этого массива
			for(let item of this.resultArray) { 
				for (let obj in item) {
					formData.append(obj, item[obj].substring(0, item[obj].length - 1))//https://developer.mozilla.org/ru/docs/Web/API/FormData/append#возвращает
				}
			}
	
			// const response = fetch('mail.php', {
			// 	method: 'POST',
			// 	body: formData
			// });
		});

	}

	serialize(element) { //Помещает все данные c инпутов в один объект
		let form = element.parentElement;//находим форму
		let field, s = {};
		let valueString = '';
		if (typeof form == 'object' && form.nodeName == "FORM") {
			let len = form.elements.length;
			for (let i = 0; i < len; i++) {
				field = form.elements[i];
				
				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
					if (field.type == 'select-multiple') {
						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected)
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
						// valueString += field.value + ',';
						valueString += field.value + ' '
						
						s[field.name] = valueString;	
					}
				}
			}
		}
		return s
	}
}

window.quiz = new Quiz('.quiz-form .quiz-form__content', quizData, {
	prevBtnText: "Назад",
	nextBtnText: "Следующий шаг",
});

