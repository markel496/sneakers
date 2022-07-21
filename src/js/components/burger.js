let burgerIcon = document.querySelector('.icon-menu');
let menu = document.querySelector('.header__nav');
let body = document.querySelector('body');

burgerIcon.addEventListener("click", function() {
	if (window.innerWidth > 510) {
		burgerIcon.classList.toggle('_active');
		menu.classList.toggle('_active');
		if (!body.classList.contains('disable-scroll')) {
			bodyDisableScroll ();
		} 	else if (!document.querySelector('.modal').classList.contains('is-open')) {
				bodyEnableScroll ();
			}

		} 	else {
		let modalActive = document.querySelector('.modal.is-open');
		
		if (cartWrapper.classList.contains('_open') && body.classList.contains('disable-scroll')) {
			cartWrapper.classList.remove('_open');
			burgerIcon.classList.add('_active');
			menu.classList.add('_active');
		} else {
			burgerIcon.classList.toggle('_active');
			menu.classList.toggle('_active');
			
			if (burgerIcon.classList.contains('_active') && !modalActive) {
				bodyDisableScroll ();

			}	else if (!modalActive) {
					bodyEnableScroll ();
				}
		}
	}
});

menu.addEventListener("click", function(e) {
	if (menu.classList.contains('_active')) {
		if (e.target.classList.contains('header__link')) {
			burgerIcon.classList.toggle('_active');
			menu.classList.toggle('_active');
			if (!burgerIcon.classList.contains('_active')) {
				bodyEnableScroll ();
			}
		}
	}
});

