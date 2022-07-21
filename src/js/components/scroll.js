const catalog = document.querySelector('.catalog');
const about = document.querySelector('.about');
const quiz = document.querySelector('.quiz');
const team = document.querySelector('.team');
const faq = document.querySelector('.faq');
const contacts = document.querySelector('.contacts');

function scrollToTargetAdjusted(element) {
	let modalActive = document.querySelector('.modal.is-open');

   var headerOffset = 64;//высота хедера
   var elementPosition = element.getBoundingClientRect().top;
   var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

   if (modalActive) {//закрываю модалку если открыта
		let modalActiveContainer = modalActive.querySelector('.modal__container.open-animate');

		if (modalActiveContainer.classList.contains('product-modal')) {
			modalActiveContainer.className = 'modal__container product-modal';
		} else {
			if (modalActiveContainer.classList.contains('cart-modal')) {
				modalActiveContainer.className = 'modal__container cart-modal';
				document.querySelector('.header__cart').classList.remove('_hidden');
			}
		}

		modalActive.className = 'modal';
		modal.isOpen = false;//modal.js
		document.body.style.paddingRight = null;
	}
 	
 	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
 		window.scrollTo({
     		top: offsetPosition,
      	behavior: "auto"
   	});
 	} 	else {
 			window.scrollTo({
     			top: offsetPosition,
      		behavior: "smooth"
   		});
 		}
}

document.addEventListener('click', (e) => {

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