function bodyDisableScroll () {
	let pagePosition = window.scrollY;//Текущее положение скролла
	body.classList.add('disable-scroll');
	body.dataset.position = pagePosition;//<body data-position="">
	body.style.top = -pagePosition + 'px';
};

function bodyEnableScroll () {
	let pagePosition = parseInt(document.body.dataset.position, 10);//в переменной числовое значение
	body.style.top = null;
	body.classList.remove('disable-scroll');
	window.scroll({
		top: pagePosition,
		left: 0
	});
	body.removeAttribute('data-position');

};