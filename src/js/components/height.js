//vh некорректно работает в мобильных браузерах 
function windowHeightForMobile () {
	let vh = window.innerHeight * 0.01;
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

if (window.innerWidth <= 510) {
	windowHeightForMobile ();
	window.addEventListener('resize', () => {
		windowHeightForMobile ();
	});
}