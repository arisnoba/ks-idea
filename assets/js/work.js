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
	parallax: true,
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
		// 모든 이미지 미리 로드
		preloadImages(data.map(work => work.image));

		const wrapper = document.querySelector('.swiper-wrapper');
		wrapper.innerHTML = '';
		data.forEach(work => {
			const slide = document.createElement('div');
			slide.className = 'swiper-slide';
			slide.innerHTML = `
				<div class="contents">
					<div class="work-img">
						<img src="${work.image}" alt="${work.id}" class="swiper-lazy" loading="lazy"/>
						<div class="swiper-lazy-preloader"></div>
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
			lazy: {
				loadPrevNext: true, // 이전, 다음 슬라이드의 이미지도 미리 로드
				loadPrevNextAmount: 2, // 몇 개의 슬라이드를 미리 로드할지 설정
				loadOnTransitionStart: true, // 트랜지션 시작 시 로드 시작
			},
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
		enableVerticalSwipeOnMobile(window.swiperH);
		setupMobileWorkImgMask(window.swiperH);
		// 첫 로드시에도 모션 적용
		document.addEventListener('DOMContentLoaded', function () {
			const firstActive = document.querySelector('.swiper-slide-active');
			if (firstActive) animateSlideContent(firstActive);
		});
		window.prevIndex = 0;
	});

// 모바일에서 수직 스와이프도 슬라이드 넘기기
function enableVerticalSwipeOnMobile(swiper) {
	if (!('ontouchstart' in window)) return;
	let startY = null;
	let startX = null;
	let threshold = 40; // 최소 스와이프 거리(px)
	const el = swiper.el;
	el.addEventListener('touchstart', function (e) {
		if (e.touches.length === 1) {
			startY = e.touches[0].clientY;
			startX = e.touches[0].clientX;
		}
	});
	el.addEventListener('touchend', function (e) {
		if (startY === null || startX === null) return;
		const endY = e.changedTouches[0].clientY;
		const endX = e.changedTouches[0].clientX;
		const diffY = endY - startY;
		const diffX = endX - startX;
		if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
			if (diffY < 0) {
				swiper.slideNext(); // 위에서 아래로 스와이프(다음)
			} else {
				swiper.slidePrev(); // 아래에서 위로 스와이프(이전)
			}
		}
		startY = null;
		startX = null;
	});
}

// 모바일 마스크 패럴렉스 이미지 전환
function setupMobileWorkImgMask(swiper) {
	if (window.innerWidth > 768) return;
	const wrapper = document.querySelector('.swiper-wrapper');
	if (!wrapper) return;
	// .work-img를 고정 위치에 하나만 두고, 이미지 레이어를 관리
	let workImg = document.querySelector('.work-img.fixed-mask');
	if (!workImg) {
		workImg = document.createElement('div');
		workImg.className = 'work-img fixed-mask';
		workImg.style.position = 'fixed';
		workImg.style.top = '80px';
		workImg.style.left = '0';
		workImg.style.width = '100vw';
		workImg.style.height = '40vh';
		workImg.style.zIndex = '10';
		workImg.style.overflow = 'hidden';
		workImg.style.background = '#fff';
		document.body.appendChild(workImg);
	}
	// 이미지 레이어 초기화
	function setWorkImg(idx) {
		const dataSlides = Array.from(wrapper.children);
		if (!dataSlides[idx]) return;
		const imgSrc = dataSlides[idx].querySelector('.work-img img').getAttribute('src');
		const oldImg = workImg.querySelector('img.active');
		const newImg = document.createElement('img');
		newImg.src = imgSrc;
		newImg.className = 'work-img-item animating';
		newImg.style.position = 'absolute';
		newImg.style.left = '0';
		newImg.style.top = '0';
		newImg.style.width = '100%';
		newImg.style.height = '100%';
		newImg.style.objectFit = 'cover';
		newImg.style.opacity = 1;
		newImg.style.zIndex = 3;
		newImg.style.clipPath = 'circle(0% at 50% 50%)';
		workImg.appendChild(newImg);
		gsap.to(newImg, {
			clipPath: 'circle(100% at 50% 50%)',
			duration: 0.7,
			ease: 'power2.out',
			onComplete: () => {
				newImg.classList.remove('animating');
				newImg.classList.add('active');
				newImg.style.zIndex = 2;
				// 이전 이미지 제거
				if (oldImg) workImg.removeChild(oldImg);
			},
		});
	}
	// 최초
	setWorkImg(swiper.activeIndex);
	swiper.on('slideChangeTransitionStart', function () {
		setWorkImg(this.activeIndex);
	});
}

// 이미지 프리로딩 함수
function preloadImages(imageUrls) {
	// 전체 페이지 로딩 상태 표시
	const loader = document.createElement('div');
	loader.className = 'page-loader';
	loader.innerHTML = `
		<div class="loader-spinner"></div>
		<div class="loader-text">Loading...</div>
	`;
	document.body.appendChild(loader);

	// 로딩할 이미지 수 추적
	let loadedCount = 0;
	const totalImages = imageUrls.length;

	return Promise.all(
		imageUrls.map(url => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					loadedCount++;
					// 로딩 진행률 업데이트 (선택사항)
					const progress = Math.round((loadedCount / totalImages) * 100);
					const loaderText = document.querySelector('.loader-text');
					if (loaderText) {
						loaderText.textContent = `Loading... ${progress}%`;
					}

					// 모든 이미지 로드 완료시 로더 제거
					if (loadedCount === totalImages) {
						setTimeout(() => {
							gsap.to(loader, {
								opacity: 0,
								duration: 0.5,
								onComplete: () => {
									document.body.removeChild(loader);
								},
							});
						}, 500); // 0.5초 더 보여준 후 페이드아웃
					}

					resolve(url);
				};
				img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
				img.src = url;
			});
		})
	).catch(error => {
		console.error('Error preloading images:', error);
		// 에러 발생해도 로더 제거
		document.body.removeChild(loader);
	});
}
