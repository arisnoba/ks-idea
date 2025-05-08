// 섹션, 이미지, 헤딩 등 주요 DOM 요소를 선택
const sections = document.querySelectorAll('section'); // 각 섹션 DOM
const images = document.querySelectorAll('.bg'); // 섹션별 배경 이미지
const headings = gsap.utils.toArray('.section-heading'); // 섹션별 헤딩 텍스트
const outerWrappers = gsap.utils.toArray('.outer'); // 외부 래퍼(애니메이션용)
const innerWrappers = gsap.utils.toArray('.inner'); // 내부 래퍼(애니메이션용)

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
	next = 0; // 다음에 보여질 섹션 인덱스

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

// 아래로 스크롤 시 섹션 등장 애니메이션
function slideIn() {
	// current가 undefined면 첫 진입(초기화)
	if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });

	// 다음 섹션을 보이게 세팅
	gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
	gsap.set(images[next], { yPercent: 0 });
	gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });

	// 타임라인으로 등장 애니메이션 실행
	const tl = gsap
		.timeline({
			paused: true,
			defaults: tlDefaults,
			onComplete: () => {
				listening = true;
				current = next;
			},
		})
		.to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
		.from(images[next], { yPercent: 15 }, 0)
		.add(revealSectionHeading(), 0);

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
	gsap.set(sections[current], { zIndex: 1 });
	gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });
	gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
	gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 });
	gsap.set(images[next], { yPercent: 0 });

	gsap
		.timeline({
			defaults: tlDefaults,
			onComplete: () => {
				listening = true;
				current = next;
			},
		})
		.to(outerWrappers[current], { yPercent: 100 }, 0)
		.to(innerWrappers[current], { yPercent: -100 }, 0)
		.to(images[current], { yPercent: 15 }, 0)
		.from(images[next], { yPercent: -15 }, 0)
		.add(revealSectionHeading(), '>-1')
		.set(images[current], { yPercent: 0 });
}

// 스크롤 방향에 따라 섹션 전환을 제어하는 함수
function handleDirection() {
	listening = false;

	if (direction === 'down') {
		next = current + 1;
		// 무한 스크롤 제거: 마지막 섹션에서 더 이상 이동하지 않음
		if (next >= sections.length) {
			next = current;
			listening = true;
			return;
		}
		slideIn();
	}

	if (direction === 'up') {
		next = current - 1;
		// 무한 스크롤 제거: 첫 섹션에서 더 이상 이동하지 않음
		if (next < 0) {
			next = current;
			listening = true;
			return;
		}
		slideOut();
	}
}

// 마우스 휠 이벤트 핸들러 (스크롤 방향 결정)
function handleWheel(e) {
	if (!listening) return;
	direction = e.wheelDeltaY < 0 ? 'down' : 'up';
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
		if (next > current) {
			slideIn();
		} else if (next < current) {
			slideOut();
		}
	});
});
