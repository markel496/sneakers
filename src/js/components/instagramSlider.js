if (document.querySelector('.right-instagram__swiper')) {

	let instSlider = null;
	let mediaQuerySize = 767.98;
	
	function instSliderInit () {
	  	if (!instSlider) {
	   	instSlider = new Swiper('.right-instagram__swiper', {
	   	  	slidesPerView: 1,
	   	  	effect: 'fade',
				speed: 700,
				observer: true,
				autoHeight: true,
				loop: true,
				spaceBetween: 15,
				autoplay: {
	   			delay: 3000
	 			}
	   	});
	  	}
	};
	
	function instSliderDestroy () {
	  	if (instSlider) {
	   	instSlider.destroy();
	   	instSlider = null;
	  	}
	};

	if (screen.width <= mediaQuerySize) {
		instSliderInit ();
	} else {
		instSliderDestroy();
	}
	
	window.addEventListener('resize', function(e) {
		let windowWidth = screen.width;
	
		if (windowWidth <= mediaQuerySize) {
	    // Инициализировать слайдер если он ещё не был инициализирован
	    instSliderInit();
	  } else {
	    // Уничтожить слайдер если он был инициализирован
	    instSliderDestroy();
	  }
	}, true);
}