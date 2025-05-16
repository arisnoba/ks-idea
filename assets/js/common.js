document.addEventListener('DOMContentLoaded', function () {
	const hamburger = document.querySelector('.hamburger');
	const drawer = document.querySelector('.drawer');
	const dim = document.querySelector('.drawer-dim');
	if (hamburger && drawer && dim) {
		hamburger.addEventListener('click', function () {
			hamburger.classList.toggle('open');
			drawer.classList.toggle('open');
			dim.classList.toggle('open');
		});
		dim.addEventListener('click', function () {
			hamburger.classList.remove('open');
			drawer.classList.remove('open');
			dim.classList.remove('open');
		});
		drawer.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('open');
				drawer.classList.remove('open');
				dim.classList.remove('open');
			});
		});
	}
});
function checkOrientationLock() {
	const lock = document.getElementById('orientation-lock');
	if (!lock) return;
	const isSmall = window.innerWidth <= 768 || window.innerHeight <= 768;
	const isLandscape = window.innerWidth > window.innerHeight;
	if (isSmall && isLandscape) {
		lock.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	} else {
		lock.style.display = 'none';
		document.body.style.overflow = '';
	}
}
window.addEventListener('resize', checkOrientationLock);
window.addEventListener('orientationchange', checkOrientationLock);
document.addEventListener('DOMContentLoaded', checkOrientationLock);
window.addEventListener('resize', () => {
	document.documentElement.style.fontSize = '16px'; // 기본값 재설정
	console.log('resize');
});
