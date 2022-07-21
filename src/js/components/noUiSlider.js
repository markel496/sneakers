var slider = document.getElementById('slider');
var priceStart = document.getElementById('price-start');
var priceEnd = document.getElementById('price-end');
var prices = [
    document.getElementById('price-start'),
    document.getElementById('price-end')
	];

if (slider) {
	noUiSlider.create(slider, {
	   start: [1850, 25768],
	   connect: true,
	   range: {
	      'min': 1850,
	      'max': 25768
	   },
	   step: 10
	});

	priceStart.addEventListener("click", function(e) {
		priceStart.select();
	});
	priceEnd.addEventListener("click", function(e) {
		priceEnd.select();
	});
	
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	
	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		slider.noUiSlider.set([priceStartValue, priceEndValue]);
	}

	slider.noUiSlider.on('update', function (values, handle) {
    	prices[handle].value = Math.round(values[handle]);
	});
}


