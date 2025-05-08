// 섹션, 이미지, 헤딩 등 주요 DOM 요소를 선택
const sections = document.querySelectorAll('section'); // 각 섹션 DOM
const images = document.querySelectorAll('.bg'); // 섹션별 배경 이미지
const headings = gsap.utils.toArray('.section-heading'); // 섹션별 헤딩 텍스트
const outerWrappers = gsap.utils.toArray('.outer'); // 외부 래퍼(애니메이션용)
const innerWrappers = gsap.utils.toArray('.inner'); // 내부 래퍼(애니메이션용)

// portfolio 영역 관련 요소
const portfolio = document.querySelector('.portfolio');
const portfolioSections = portfolio ? Array.from(portfolio.querySelectorAll('section')) : [];
// portfolioSections 인덱스와 sections 인덱스 매핑
const portfolioSectionIndices = [];
if (portfolioSections.length > 0) {
	portfolioSections.forEach(section => {
		const idx = Array.from(sections).indexOf(section);
		if (idx !== -1) portfolioSectionIndices.push(idx);
	});
	console.log('Portfolio sections found at indices:', portfolioSectionIndices);
}

// 마우스 휠, 터치 이벤트 리스너 등록
// (스크롤/스와이프 시 섹션 전환)
document.addEventListener('wheel', handleWheel);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// 상태 관리 변수
let listening = false, // 이벤트 리스닝 가능 여부
	direction = 'down', // 스크롤 방향 ('down' 또는 'up')
	current, // 현재 활성화된 섹션 인덱스
	next = 0, // 다음에 보여질 섹션 인덱스
	portfolioIndex = 0, // portfolio 내부 섹션 인덱스
	inPortfolioTransition = false; // 포트폴리오 영역 내 전환 중인지 여부

// 터치 이벤트 좌표 및 시간 저장용 객체
const touch = {
	startX: 0,
	startY: 0,
	dx: 0,
	dy: 0,
	startTime: 0,
	dt: 0,
};

// GSAP 타임라인 기본 옵션
const tlDefaults = {
	ease: 'slow.inOut',
	duration: 0.5,
};

// 각 헤딩 텍스트를 SplitText로 분리(애니메이션용)
const splitHeadings = headings.map(heading => {
	return new SplitText(heading, {
		type: 'chars, words, lines',
		linesClass: 'clip-text',
	});
});

// 헤딩 등장 애니메이션 함수
function revealSectionHeading() {
	return gsap.to(splitHeadings[next].chars, {
		autoAlpha: 1,
		yPercent: 0,
		duration: 0.5, // 등장 속도(수정 가능)
		ease: 'power2',
		stagger: {
			each: 0.02,
			from: 'random',
		},
	});
}

// 초기 상태: 모든 섹션, 이미지, 헤딩을 숨기고 래퍼 위치 세팅
gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

// 포트폴리오 섹션 초기 세팅 - 포트폴리오 섹션이 흰색으로 안 보이는 문제 해결
portfolioSections.forEach(section => {
	gsap.set(section, {
		autoAlpha: 0, // 초기에는 숨김
		display: 'flex', // display:flex 설정은 유지
		visibility: 'hidden', // 초기에는 숨김
		xPercent: 0, // 가로 위치 초기화
	});

	// 백그라운드 색상 확인을 위한 디버깅
	console.log('Portfolio section style:', section.getAttribute('class'), window.getComputedStyle(section).backgroundColor, window.getComputedStyle(section).display);
});

// 현재 섹션이 portfolio 영역인지 확인
function isInPortfolio(index) {
	const result = portfolioSectionIndices.includes(index);
	return result;
}

// portfolio 내부에서 좌우 슬라이드 인덱스 구하기
function getPortfolioIndex(sectionIndex) {
	return portfolioSectionIndices.indexOf(sectionIndex);
}

// 아래로 스크롤 시 섹션 등장 애니메이션
function slideIn() {
	// 포트폴리오 내부 섹션 간 이동인 경우 좌우 슬라이드로 처리
	if (isInPortfolio(current) && isInPortfolio(next)) {
		slideHorizontal('right');
		return;
	}

	console.log(`Sliding in from ${current} to ${next}, isInPortfolio=${isInPortfolio(next)}`);

	// current가 undefined면 첫 진입(초기화)
	if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });

	// 다음 섹션을 보이게 세팅
	gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
	gsap.set(images[next], { yPercent: 0 });
	if (splitHeadings[next]) {
		gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
	}

	// 타임라인으로 등장 애니메이션 실행
	const tl = gsap
		.timeline({
			paused: true,
			defaults: tlDefaults,
			onComplete: () => {
				listening = true;
				current = next;
				// portfolio 영역에 들어가거나 나올 때 인덱스 업데이트
				if (isInPortfolio(current)) {
					portfolioIndex = getPortfolioIndex(current);
					console.log(`Portfolio index updated to ${portfolioIndex}`);
				}
			},
		})
		.to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
		.from(images[next], { yPercent: 15 }, 0);

	// 헤딩 텍스트가 있을 때만 애니메이션 적용
	if (splitHeadings[next]) {
		tl.add(revealSectionHeading(), 0);
	}

	// 이전 섹션이 있다면 퇴장 애니메이션 추가
	if (current !== undefined) {
		tl.add(
			gsap.to(images[current], {
				yPercent: -15,
				...tlDefaults,
			}),
			0
		).add(
			gsap.timeline().set(outerWrappers[current], { yPercent: 100 }).set(innerWrappers[current], { yPercent: -100 }).set(images[current], { yPercent: 0 }).set(sections[current], { autoAlpha: 0 })
		);
	}

	tl.play(0);
}

// 위로 스크롤 시 섹션 퇴장 애니메이션
function slideOut() {
	// 포트폴리오 내부 섹션 간 이동인 경우 좌우 슬라이드로 처리
	if (isInPortfolio(current) && isInPortfolio(next)) {
		slideHorizontal('left');
		return;
	}

	console.log(`Sliding out from ${current} to ${next}, isInPortfolio=${isInPortfolio(next)}`);

	gsap.set(sections[current], { zIndex: 1 });
	gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });
	if (splitHeadings[next]) {
		gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
	}
	gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 });
	gsap.set(images[next], { yPercent: 0 });

	const tl = gsap
		.timeline({
			defaults: tlDefaults,
			onComplete: () => {
				listening = true;
				current = next;
				// portfolio 영역에 들어가거나 나올 때 인덱스 업데이트
				if (isInPortfolio(current)) {
					portfolioIndex = getPortfolioIndex(current);
					console.log(`Portfolio index updated to ${portfolioIndex}`);
				}
			},
		})
		.to(outerWrappers[current], { yPercent: 100 }, 0)
		.to(innerWrappers[current], { yPercent: -100 }, 0)
		.to(images[current], { yPercent: 15 }, 0)
		.from(images[next], { yPercent: -15 }, 0);

	// 헤딩 텍스트가 있을 때만 애니메이션 적용
	if (splitHeadings[next]) {
		tl.add(revealSectionHeading(), '>-0.5');
	}

	tl.set(images[current], { yPercent: 0 });
}

// 좌우 슬라이드 애니메이션 (portfolio 내부 섹션용)
function slideHorizontal(direction) {
	inPortfolioTransition = true;

	// 현재와 다음 섹션의 portfolio 내부 인덱스
	const currPortfolioIdx = getPortfolioIndex(current);
	const nextPortfolioIdx = getPortfolioIndex(next);

	console.log(`Sliding horizontal ${direction}: portfolio ${currPortfolioIdx} -> ${nextPortfolioIdx}, sections ${current} -> ${next}`);

	// 좌우 이동 방향에 따라 애니메이션 설정
	const xStart = direction === 'right' ? 100 : -100;
	const xEnd = direction === 'right' ? -100 : 100;

	// 확실한 디버깅을 위해 모든 섹션 상태 로깅
	console.log('Before animation - Current section:', current, 'style:', {
		zIndex: sections[current].style.zIndex,
		opacity: sections[current].style.opacity,
		visibility: sections[current].style.visibility,
		display: sections[current].style.display,
		backgroundColor: window.getComputedStyle(sections[current]).backgroundColor,
	});
	console.log('Before animation - Next section:', next, 'style:', {
		zIndex: sections[next].style.zIndex,
		opacity: sections[next].style.opacity,
		visibility: sections[next].style.visibility,
		display: sections[next].style.display,
		backgroundColor: window.getComputedStyle(sections[next]).backgroundColor,
	});

	// 포트폴리오 섹션들 모두 표시
	portfolioSections.forEach((section, idx) => {
		const sectionIndex = portfolioSectionIndices[idx];
		// 현재 애니메이션 중인 두 섹션만 보이게, 나머지는 숨김
		const isVisible = sectionIndex === current || sectionIndex === next;

		if (isVisible) {
			// 현재 애니메이션에 관련된 섹션은 완전히 보이게
			gsap.set(section, {
				autoAlpha: 1,
				xPercent: sectionIndex === next ? xStart : sectionIndex === current ? 0 : 0,
				zIndex: sectionIndex === next ? 2 : sectionIndex === current ? 1 : 0,
				display: 'flex',
				visibility: 'visible',
			});
		} else {
			// 관련 없는 섹션은 일단 숨김, 단 display는 flex로 유지
			gsap.set(section, {
				autoAlpha: 0,
				xPercent: 0,
				zIndex: 0,
				display: 'flex',
				visibility: 'hidden',
			});
		}

		// 처리 후 상태 확인
		console.log(
			`Portfolio ${idx} (section ${sectionIndex}) setup:`,
			isVisible ? 'VISIBLE' : 'HIDDEN',
			'bg-color:',
			window.getComputedStyle(section).backgroundColor,
			'display:',
			window.getComputedStyle(section).display
		);
	});

	// 현재 섹션은 반대 방향으로 이동하도록 설정
	gsap.set(sections[current], {
		zIndex: 1,
		xPercent: 0,
		autoAlpha: 1,
		display: 'flex',
		visibility: 'visible',
		opacity: 1,
	});

	// 다음 섹션은 시작 위치에 배치하고 확실히 보이게 설정
	gsap.set(sections[next], {
		autoAlpha: 1,
		zIndex: 2,
		xPercent: xStart,
		display: 'flex',
		visibility: 'visible',
		opacity: 1,
	});

	if (splitHeadings[next]) {
		gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 0 });
	}

	// 애니메이션 실행 및 확인 로그
	console.log(`Starting animation: ${current} -> ${next}`);

	gsap
		.timeline({
			defaults: { ...tlDefaults, duration: 0.8 },
			onStart: () => {
				console.log('Animation started');
			},
			onComplete: () => {
				inPortfolioTransition = false;
				listening = true;
				current = next;
				portfolioIndex = nextPortfolioIdx;

				// 모든 섹션 위치 초기화
				sections.forEach((section, idx) => {
					// 현재 섹션만 보이게, 나머지는 숨김
					const isVisible = idx === current;
					if (isInPortfolio(idx)) {
						if (isVisible) {
							gsap.set(section, {
								xPercent: 0,
								autoAlpha: 1,
								display: 'flex',
								visibility: 'visible',
								opacity: 1,
							});
							console.log(`Section ${idx} now VISIBLE`);
						} else {
							gsap.set(section, {
								xPercent: 0,
								autoAlpha: 0,
								display: 'flex', // display는 flex로 유지
								visibility: 'hidden',
								opacity: 0,
							});
							console.log(`Section ${idx} now HIDDEN`);
						}
					}
				});

				console.log(`Horizontal slide complete. Current=${current}, portfolioIndex=${portfolioIndex}`);
				console.log('After animation - Current section:', current, 'style:', {
					zIndex: sections[current].style.zIndex,
					opacity: sections[current].style.opacity,
					visibility: sections[current].style.visibility,
					display: sections[current].style.display,
					backgroundColor: window.getComputedStyle(sections[current]).backgroundColor,
				});
			},
		})
		.to(sections[current], { xPercent: xEnd }, 0)
		.to(sections[next], { xPercent: 0 }, 0);

	// 헤딩 텍스트가 있을 때만 애니메이션 적용
	if (splitHeadings[next]) {
		gsap.to(splitHeadings[next].chars, {
			autoAlpha: 1,
			yPercent: 0,
			duration: 0.5,
			ease: 'power2',
			stagger: {
				each: 0.02,
				from: 'random',
			},
			delay: 0.3,
		});
	}
}

// 스크롤 방향에 따라 섹션 전환을 제어하는 함수
function handleDirection() {
	// 이미 이벤트 리스닝 중이거나 포트폴리오 영역 내 전환 중이면 무시
	if (!listening || inPortfolioTransition) return;

	listening = false;

	if (direction === 'down') {
		// portfolio 내부이면서 아직 마지막 포트폴리오 섹션이 아닌 경우
		if (isInPortfolio(current) && portfolioIndex < portfolioSectionIndices.length - 1) {
			portfolioIndex++;
			next = portfolioSectionIndices[portfolioIndex];
			console.log(`Moving down in portfolio: ${portfolioIndex}, next section: ${next}`);
		} else {
			next = current + 1;
			console.log(`Moving down to next section: ${next}`);
		}

		// 무한 스크롤 제거: 마지막 섹션에서 더 이상 이동하지 않음
		if (next >= sections.length) {
			console.log('Reached last section');
			next = current;
			listening = true;
			return;
		}
		slideIn();
	}

	if (direction === 'up') {
		// portfolio 내부이면서 아직 첫 포트폴리오 섹션이 아닌 경우
		if (isInPortfolio(current) && portfolioIndex > 0) {
			portfolioIndex--;
			next = portfolioSectionIndices[portfolioIndex];
			console.log(`Moving up in portfolio: ${portfolioIndex}, next section: ${next}`);
		} else {
			next = current - 1;
			console.log(`Moving up to previous section: ${next}`);
		}

		// 무한 스크롤 제거: 첫 섹션에서 더 이상 이동하지 않음
		if (next < 0) {
			console.log('Reached first section');
			next = 0; // next를 0으로 설정 (0보다 작게 만들지 않음)
			listening = true;
			return;
		}
		slideOut();
	}
}

// 마우스 휠 이벤트 핸들러 (스크롤 방향 결정)
function handleWheel(e) {
	// 이벤트 리스닝 중이 아니거나 포트폴리오 영역 내 전환 중이면 무시
	if (!listening || inPortfolioTransition) return;

	direction = e.wheelDeltaY < 0 ? 'down' : 'up';

	// 첫 번째 섹션에서 위로 스크롤할 때는 무시
	if (direction === 'up' && current === 0) {
		console.log('Already at first section, ignoring upward scroll');
		return;
	}

	// 마지막 섹션에서 아래로 스크롤할 때는 무시
	if (direction === 'down' && current === sections.length - 1) {
		console.log('Already at last section, ignoring downward scroll');
		return;
	}

	handleDirection();
}

// 터치 시작 시 좌표 저장
function handleTouchStart(e) {
	if (!listening) return;
	const t = e.changedTouches[0];
	touch.startX = t.pageX;
	touch.startY = t.pageY;
}

// 터치 이동 시 기본 동작 방지(스크롤 막기)
function handleTouchMove(e) {
	if (!listening) return;
	e.preventDefault();
}

// 터치 종료 시 방향 계산 후 섹션 전환
function handleTouchEnd(e) {
	if (!listening) return;
	const t = e.changedTouches[0];
	touch.dx = t.pageX - touch.startX;
	touch.dy = t.pageY - touch.startY;

	// 상하 스와이프만 감지 (좌우 스와이프는 제거)
	if (touch.dy > 10) direction = 'up';
	if (touch.dy < -10) direction = 'down';
	handleDirection();
}

// 첫 진입 시 첫 섹션 등장
slideIn();

// 네비게이션 앵커 클릭 시 해당 섹션으로 이동
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href').replace('#', '');
		const targetSection = document.getElementById(targetId);
		if (!targetSection) return;
		const targetIdx = Array.from(sections).indexOf(targetSection);
		if (targetIdx === -1 || targetIdx === current) return;

		// 상태 업데이트 및 애니메이션 실행
		next = targetIdx;

		// portfolio 영역 이동인 경우 인덱스 업데이트
		if (isInPortfolio(next)) {
			portfolioIndex = getPortfolioIndex(next);
		}

		if (next > current) {
			slideIn();
		} else if (next < current) {
			slideOut();
		}
	});
});

// --- portfolio 가로 슬라이드 구현 ---
// 중복으로 선언된 portfolio 변수와 관련 코드가 이미 위에서 선언되어 있으므로 이 부분은 삭제
