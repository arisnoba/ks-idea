function animateGrowthRows() {
	document.querySelectorAll('.swiper-slide-active .growth-row').forEach((row, i) => {
		// 전체 row에 대한 초기 상태 설정
		gsap.set(row, { opacity: 0, y: 40 });

		// row 내부 요소들은 따로 애니메이션 처리하지 않음
		// 대신 row와 함께 나타나도록 함

		const tl = gsap.timeline({});
		tl.to(row, { opacity: 1, y: 0, duration: 0, ease: 'power2.out' });

		// 내부 요소 개별 애니메이션 제거
	});
}

function animateSlideContent(slide) {
	const h1 = slide.querySelector('h1');
	const h2 = slide.querySelector('h2');
	const desc = slide.querySelector('.desc');
	const growthList = slide.querySelector('.growth-list');

	if (h1) gsap.set(h1, { opacity: 0, y: 40 });
	if (h2) gsap.set(h2, { opacity: 0, y: 40 });
	if (desc) gsap.set(desc, { opacity: 0, y: 40 });

	const tl = gsap.timeline();
	if (h1) tl.to(h1, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	if (h2) tl.to(h2, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.5);

	// if (growthList) animateGrowthRows();
}

function fadeOutSlideContent(slide) {
	const h1 = slide.querySelector('h1');
	const h2 = slide.querySelector('h2');
	const desc = slide.querySelector('.desc');

	const tl = gsap.timeline();
	if (h1) tl.to(h1, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
	if (h2) tl.to(h2, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
	if (desc) tl.to(desc, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
}

function fadeOutGrowthRows() {
	document.querySelectorAll('.swiper-slide .growth-row').forEach(row => {
		const en = row.querySelector('.growth-en');
		if (en) {
			gsap.to(en, { opacity: 0, x: '100%', duration: 0.3, ease: 'power2.in' });
		}
	});
}

var prevIndex = 0;
var swiperV = new Swiper('.swiper-v', {
	direction: 'vertical',
	mousewheel: true,
	parallax: true,
	speed: 1200,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		slideChangeTransitionStart: function () {
			// 이전 슬라이드 텍스트 자연스럽게 사라지게
			if (typeof prevIndex === 'number' && this.slides[prevIndex]) {
				fadeOutSlideContent(this.slides[prevIndex]);
			}
			// 새 슬라이드 텍스트는 바로 나타나게
			const activeSlide = this.slides[this.activeIndex];
			animateSlideContent(activeSlide);
			prevIndex = this.activeIndex;
		},
	},
});

// 첫 로드시에도 모션 적용
document.addEventListener('DOMContentLoaded', function () {
	const firstActive = document.querySelector('.swiper-slide-active');
	if (firstActive) animateSlideContent(firstActive);
});
