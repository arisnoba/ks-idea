function animateSlideContent(slide) {
	const heading = slide.querySelector('.section-heading');
	const brand = slide.querySelector('.brand');
	const desc = slide.querySelector('.work-desc');

	if (heading) gsap.set(heading, { opacity: 0, x: 40 });
	if (brand) gsap.set(brand, { opacity: 0, x: 40 });
	if (desc) gsap.set(desc, { opacity: 0, x: 40 });

	const tl = gsap.timeline();
	if (heading) tl.to(heading, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	if (brand) tl.to(brand, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.8);
	if (desc) tl.to(desc, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.9);
}

function fadeOutSlideContent(slide) {
	const heading = slide.querySelector('.section-heading');
	const brand = slide.querySelector('.brand');
	const desc = slide.querySelector('.work-desc');

	const tl = gsap.timeline();
	if (heading) tl.to(heading, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	if (brand) tl.to(brand, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	if (desc) tl.to(desc, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
}

var prevIndex = 0;
var swiperH = new Swiper('.swiper-h', {
	direction: 'horizontal',
	mousewheel: true,
	speed: 1000,
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

// 슬라이드 동적 생성
fetch('/assets/data/works.json')
	.then(res => res.json())
	.then(data => {
		const wrapper = document.querySelector('.swiper-wrapper');
		wrapper.innerHTML = '';
		data.forEach(work => {
			const slide = document.createElement('div');
			slide.className = 'swiper-slide';
			slide.innerHTML = `
				<div class="contents">
					<div class="work-img">
						<img src="${work.image}" alt="${work.id}" />
					</div>
					<div class="work-info">
						<h2 class="section-heading">${work.title}</h2>
						<p class="brand">${work.brand}</p>
						<p class="work-desc">${work.desc}</p>
					</div>
				</div>
			`;
			wrapper.appendChild(slide);
		});
		// 동적으로 생성 후 Swiper 재초기화
		if (window.swiperH) window.swiperH.destroy(true, true);
		window.swiperH = new Swiper('.swiper-h', {
			direction: 'horizontal',
			mousewheel: true,
			speed: 1000,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			on: {
				slideChangeTransitionStart: function () {
					if (typeof window.prevIndex === 'number' && this.slides[window.prevIndex]) {
						fadeOutSlideContent(this.slides[window.prevIndex]);
					}
					const activeSlide = this.slides[this.activeIndex];
					animateSlideContent(activeSlide);
					window.prevIndex = this.activeIndex;
				},
			},
		});
		// 첫 로드시에도 모션 적용
		document.addEventListener('DOMContentLoaded', function () {
			const firstActive = document.querySelector('.swiper-slide-active');
			if (firstActive) animateSlideContent(firstActive);
		});
		window.prevIndex = 0;
	});
