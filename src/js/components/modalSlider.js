if (document.querySelector('.item-left__mainslider', '.item-left__subslider')) {
	let productSubSlider = new Swiper('.item-left__subslider', {
		slidesPerView: 3,
		speed: 700,
		observer: true,
		breakpoints: {
    		// when window width is >= 600px
    		400: {
    		  slidesPerView: 4,
    		  // spaceBetween: 20
    		},
    		600: {
    		  slidesPerView: 6,
    		  // spaceBetween: 20
    		}
   	}
	});

	let productMainSlider = new Swiper('.item-left__mainslider', {
		slidesPerView: 1,
		speed: 700,
		thumbs: {
			swiper: productSubSlider
		},
		observer: true
	});
}