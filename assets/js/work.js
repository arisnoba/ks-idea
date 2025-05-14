function animateSlideContent(slide) {
	if (!slide) return;

	const heading = slide.querySelector('.section-heading');
	const brand = slide.querySelector('.brand');
	const desc = slide.querySelector('.work-desc');
	const descDiv = slide.querySelector('div.work-desc'); // 특별한 div.work-desc 처리
	const img = slide.querySelector('.work-img img');

	// 요소 초기 상태 설정
	if (heading) gsap.set(heading, { opacity: 0, x: 40 });
	if (brand) gsap.set(brand, { opacity: 0, x: 40 });
	if (desc && desc.tagName === 'P') gsap.set(desc, { opacity: 0, x: 40 });

	// div.work-desc 내부 p 태그들 초기화
	if (descDiv && descDiv.tagName === 'DIV') {
		const paragraphs = descDiv.querySelectorAll('p');
		if (paragraphs.length > 0) {
			gsap.set(paragraphs, { opacity: 0, x: 40 });
		} else {
			gsap.set(descDiv, { opacity: 0, x: 40 });
		}
	}

	// 타임라인으로 애니메이션 실행
	const tl = gsap.timeline();

	// 헤딩 애니메이션
	if (heading) {
		tl.to(heading, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	}

	// 브랜드 애니메이션
	if (brand) {
		tl.to(brand, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	}

	// 일반 work-desc 애니메이션
	if (desc && desc.tagName === 'P') {
		tl.to(desc, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
	}

	// div.work-desc 내부 p 태그들 애니메이션
	if (descDiv && descDiv.tagName === 'DIV') {
		const paragraphs = descDiv.querySelectorAll('p');
		if (paragraphs.length > 0) {
			tl.to(
				paragraphs,
				{
					opacity: 1,
					x: 0,
					duration: 0.7,
					stagger: 0,
					ease: 'power2.out',
				},
				0.5
			);
		} else {
			tl.to(descDiv, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.5);
		}
	}

	// 이미지 애니메이션 (있는 경우에만)
	if (img) {
		gsap.fromTo(
			img,
			{ scale: 1.05, opacity: 0.8 },
			{
				scale: 1,
				opacity: 1,
				duration: 1.2,
				ease: 'power2.out',
			}
		);
	}
}

function fadeOutSlideContent(slide) {
	const heading = slide.querySelector('.section-heading');
	const brand = slide.querySelector('.brand');
	const desc = slide.querySelector('.work-desc');
	const descDiv = slide.querySelector('div.work-desc');
	const descParagraphs = descDiv ? descDiv.querySelectorAll('p') : null;

	const tl = gsap.timeline();
	if (heading) tl.to(heading, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	if (brand) tl.to(brand, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	if (desc && desc.tagName === 'P') tl.to(desc, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);

	// div.work-desc 내부 p 태그들 페이드아웃
	if (descParagraphs && descParagraphs.length > 0) {
		tl.to(descParagraphs, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	} else if (descDiv) {
		tl.to(descDiv, { opacity: 0, x: 40, duration: 0.3, ease: 'power2.in' }, 0);
	}
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

// 슬라이드 동적 생성 (이제 하드코딩으로 변경)
// 현재 DOM에 있는 슬라이드를 사용하도록 수정
document.addEventListener('DOMContentLoaded', function () {
	// 모든 이미지 미리 로드 (하드코딩된 이미지를 모두 찾아서 배열로 만듦)
	const imageElements = document.querySelectorAll('.swiper-slide .work-img img');
	const imageUrls = Array.from(imageElements).map(img => img.src);

	// 전체 페이지 로딩 상태 표시
	preloadImages(imageUrls);

	// 동적으로 생성 대신 기존 슬라이드 사용하여 Swiper 초기화
	window.swiperH = new Swiper('.swiper-h', {
		direction: 'horizontal',
		mousewheel: true,
		speed: 1000,
		// 커스텀 프리로더를 사용하므로 lazy loading 비활성화
		lazy: false,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {
			slideChangeTransitionStart: function () {
				// 이전 슬라이드 텍스트 자연스럽게 사라지게
				if (typeof window.prevIndex === 'number' && this.slides[window.prevIndex]) {
					fadeOutSlideContent(this.slides[window.prevIndex]);
				}
				// 새 슬라이드 텍스트는 바로 나타나게
				const activeSlide = this.slides[this.activeIndex];
				if (activeSlide) {
					animateSlideContent(activeSlide);

					// data-type에 따라 클래스 추가/제거
					const slideType = activeSlide.dataset.type;
					const swiperContainer = document.querySelector('.swiper.swiper-h');

					if (slideType === 'text') {
						swiperContainer.classList.add('dis-cover');
					} else {
						swiperContainer.classList.remove('dis-cover');
					}
				}
				window.prevIndex = this.activeIndex;
			},
		},
	});
	enableVerticalSwipeOnMobile(window.swiperH);
	// setupMobileWorkImgMask(window.swiperH);

	// 첫 로드시에도 모션 적용
	const firstActive = document.querySelector('.swiper-slide-active');
	if (firstActive) {
		animateSlideContent(firstActive);

		// 첫 로드시에도 data-type 확인하여 클래스 추가/제거
		const slideType = firstActive.dataset.type;
		const swiperContainer = document.querySelector('.swiper.swiper-h');

		if (slideType === 'text') {
			swiperContainer.classList.add('dis-cover');
		} else {
			swiperContainer.classList.remove('dis-cover');
		}
	}

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

		// 수직 스와이프 감지
		if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
			if (diffY < 0) {
				swiper.slideNext(); // 위에서 아래로 스와이프(이전)
			} else {
				swiper.slidePrev(); // 아래에서 위로 스와이프(다음)
			}
		}
		// 수평 스와이프 감지 추가
		else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
			if (diffX < 0) {
				swiper.slideNext(); // 왼쪽에서 오른쪽으로 스와이프(다음)
			} else {
				swiper.slidePrev(); // 오른쪽에서 왼쪽으로 스와이프(이전)
			}
		}
		startY = null;
		startX = null;
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
	document.body.style.overflow = 'hidden'; // 로딩 중 스크롤 방지

	// URL에서 디버그 모드 확인 (예: ?debug_loader=5000 - 5초 지연)
	const urlParams = new URLSearchParams(window.location.search);
	const debugDelay = urlParams.get('debug_loader');

	// 디버그 버튼 추가 (개발 중에만 사용)
	if (debugDelay === 'controls') {
		const debugControls = document.createElement('div');
		debugControls.className = 'loader-debug-controls';
		debugControls.innerHTML = `
			<button class="debug-btn" onclick="document.querySelector('.page-loader').remove(); document.body.style.overflow = '';">
				닫기
			</button>
			<div class="debug-info">
				<p>디버그 모드: 로더 컨트롤</p>
				<p>프리로더를 수동으로 닫으려면 버튼을 클릭하세요.</p>
			</div>
		`;
		loader.appendChild(debugControls);

		// 스타일 추가
		const style = document.createElement('style');
		style.textContent = `
			.loader-debug-controls {
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.debug-btn {
				padding: 8px 16px;
				background: #333;
				color: white;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				margin-bottom: 10px;
			}
			.debug-info {
				font-size: 12px;
				color: #666;
				text-align: center;
			}
		`;
		document.head.appendChild(style);

		// 프로미스 즉시 반환하고 수동 제어
		return Promise.resolve();
	}

	// 로딩할 이미지 수 추적
	let loadedCount = 0;
	const totalImages = imageUrls.length;

	return new Promise(resolveAll => {
		// 디버그 모드인 경우 지연 시간 설정
		if (debugDelay && !isNaN(parseInt(debugDelay))) {
			const delayTime = parseInt(debugDelay);
			// 가상의 로딩 진행 시뮬레이션
			let progress = 0;
			const interval = setInterval(() => {
				progress += 5;
				if (progress > 100) {
					clearInterval(interval);
					setTimeout(() => {
						gsap.to(loader, {
							opacity: 0,
							duration: 0.8,
							onComplete: () => {
								document.body.removeChild(loader);
								document.body.style.overflow = '';
								resolveAll();
							},
						});
					}, 500);
				} else {
					// 진행률 업데이트
					const loaderText = document.querySelector('.loader-text');
					if (loaderText) {
						loaderText.textContent = `Loading... ${progress}%`;
					}
				}
			}, delayTime / 20); // 진행 속도 조절

			return;
		}

		// 일반 모드: 실제 이미지 프리로딩
		Promise.all(
			imageUrls.map(url => {
				return new Promise(resolve => {
					const img = new Image();
					img.onload = () => {
						loadedCount++;
						// 로딩 진행률 업데이트
						const progress = Math.round((loadedCount / totalImages) * 100);
						const loaderText = document.querySelector('.loader-text');
						if (loaderText) {
							loaderText.textContent = `Loading... ${progress}%`;
						}

						resolve(url);
					};
					img.onerror = () => {
						loadedCount++;
						console.error(`Failed to load image: ${url}`);
						resolve(url); // 에러지만 promise는 resolve 처리
					};
					img.src = url;
				});
			})
		).then(() => {
			// 모든 이미지 로드 완료시 로더 제거
			setTimeout(() => {
				gsap.to(loader, {
					opacity: 0,
					duration: 0.8,
					onComplete: () => {
						document.body.removeChild(loader);
						document.body.style.overflow = '';
						resolveAll();
					},
				});
			}, 500); // 0.5초 더 보여준 후 페이드아웃
		});
	});
}
