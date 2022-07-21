let tooltip = document.querySelector('.tooltip');

if (tooltip) {
	document.addEventListener('click', (e) => {
		let target = e.target;
		if (target.closest('.tooltip') && !target.closest('._tooltip-open')) {
			tooltip.classList.add('_tooltip-open');
		}

		else if ((!target.closest('.tooltip__text') && target.closest('._tooltip-open')) || !target.closest('._tooltip-open')) {
			tooltip.classList.remove('_tooltip-open');
		}
	});
}