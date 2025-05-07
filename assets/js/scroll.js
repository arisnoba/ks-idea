/* START :: Lenis */
const SmoothScroll = {};

SmoothScroll.init = function () {
	// if (AppInfo.isTouchDevice) return;
	console.log('SmoothScroll.init');
	// https://github.com/darkroomengineering/lenis
	// https://velog.io/@jongk91/lenis-smooth-scroll
	window.lenis = new Lenis();
	const lenis = window.lenis;

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
};

SmoothScroll.stop = function () {
	document.body.classList.add('prevent-scroll');
	if (window.lenis) window.lenis.stop();
};

SmoothScroll.start = function () {
	document.body.classList.remove('prevent-scroll');
	if (window.lenis) window.lenis.start();
};

/* // END :: Lenis */

// lenis 출발
SmoothScroll.init();
if (window.AOS) {
	// AOS 초기화
	AOS.init({
		once: true,
		offset: 100,
		duration: 1000,
		easing: 'ease-out-cubic',
		disable: function () {
			return window.innerWidth < 768;
		},
	});
}

/* START CustomScrollBar */
document.addEventListener('DOMContentLoaded', function () {
	// if (AppInfo.isTouchDevice) return;

	let scrollBar = document.querySelector('.c-scrollbar-y');
	if (!scrollBar) {
		scrollBar = document.createElement('div');
		scrollBar.className = 'c-scrollbar-y';
		scrollBar.innerHTML = '<div class="thumb"></div>';
		document.body.appendChild(scrollBar);
	}

	const scrollThumb = scrollBar.querySelector('.thumb');

	// 스크롤바 높이 계산
	function updateScrollbar() {
		const windowHeight = window.innerHeight;
		const bodyHeight = document.body.scrollHeight;
		const scrollbarHeight = (windowHeight / bodyHeight) * windowHeight;

		scrollThumb.style.height = scrollbarHeight + 'px';
	}

	// 스크롤 위치에 따른 thumb 위치 조정
	function moveThumb() {
		const scrollTop = window.scrollY;
		const bodyHeight = document.body.scrollHeight;
		const windowHeight = window.innerHeight;
		const scrollPercent = scrollTop / (bodyHeight - windowHeight);

		const scrollbarHeight = scrollBar.offsetHeight;
		const thumbHeight = scrollThumb.offsetHeight;
		const maxThumbPosition = scrollbarHeight - thumbHeight;

		scrollThumb.style.top = scrollPercent * maxThumbPosition + 'px';
	}

	let isDragging = false;
	let startY;
	let startTop;

	scrollThumb.addEventListener('mousedown', function (event) {
		scrollBar.classList.add('hover');

		isDragging = true;
		startY = event.clientY;
		startTop = parseFloat(getComputedStyle(scrollThumb).top);
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	});

	function mouseMoveHandler(event) {
		if (!isDragging) return;

		const deltaY = event.clientY - startY;
		let newTop = startTop + deltaY;

		const scrollbarHeight = scrollBar.offsetHeight;
		const thumbHeight = scrollThumb.offsetHeight;
		const maxThumbPosition = scrollbarHeight - thumbHeight;

		if (newTop < 0) newTop = 0;
		if (newTop > maxThumbPosition) newTop = maxThumbPosition;

		const scrollPercent = newTop / maxThumbPosition;
		const scrollTop = scrollPercent * (document.body.scrollHeight - window.innerHeight);

		window.lenis.scrollTo(scrollTop, {
			immediate: true,
		});
	}

	function mouseUpHandler() {
		scrollBar.classList.remove('hover');

		isDragging = false;
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	}

	// 애니메이션 프레임마다 스크롤바 업데이트
	let frameId;
	function updateOnFrame() {
		updateScrollbar();
		frameId = requestAnimationFrame(updateOnFrame);
	}
	updateOnFrame();

	moveThumb();

	window.addEventListener('scroll', moveThumb);
	window.addEventListener('resize', updateScrollbar);
});
/* // END CustomScrollBar */
