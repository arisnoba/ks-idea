gsap.registerPlugin(SplitText);

gsap.set('h1', { opacity: 1 });

let split = SplitText.create('#heading', { type: 'chars' });
gsap.from(split.chars, {
	y: -10,
	autoAlpha: 0,
	stagger: 0.09,
});

// grow-or-disappear section 애니메이션
// h2 span 각각 등장
gsap.from('.grow-or-disappear h2 span', {
	scrollTrigger: {
		trigger: '.grow-or-disappear',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('grow-or-disappear h2 span 애니메이션 시작'),
	},
	y: 60,
	opacity: 0,
	stagger: 1,
	duration: 1,
	ease: 'power3.out',
	onComplete: () => console.log('grow-or-disappear h2 span 애니메이션 끝'),
});
// p 등장
gsap.from('.grow-or-disappear p', {
	scrollTrigger: {
		trigger: '.grow-or-disappear',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('grow-or-disappear p 애니메이션 시작'),
	},
	y: 40,
	opacity: 0,
	duration: 1,
	delay: 0.6,
	ease: 'power3.out',
	onComplete: () => console.log('grow-or-disappear p 애니메이션 끝'),
});

// grow-lab section 애니메이션
// h2 등장
gsap.from('.grow-lab h2', {
	scrollTrigger: {
		trigger: '.grow-lab',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('grow-lab h2 애니메이션 시작'),
	},
	y: 60,
	opacity: 0,
	duration: 1,
	ease: 'power3.out',
	onComplete: () => console.log('grow-lab h2 애니메이션 끝'),
});
// p 등장
gsap.from('.grow-lab p', {
	scrollTrigger: {
		trigger: '.grow-lab',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('grow-lab p 애니메이션 시작'),
	},
	y: 40,
	opacity: 0,
	duration: 1,
	delay: 0.3,
	ease: 'power3.out',
	onComplete: () => console.log('grow-lab p 애니메이션 끝'),
});

// program section 애니메이션
// h2 등장
gsap.from('.program h2', {
	scrollTrigger: {
		trigger: '.program',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('program h2 애니메이션 시작'),
	},
	y: 60,
	opacity: 0,
	duration: 1,
	ease: 'power3.out',
	onComplete: () => console.log('program h2 애니메이션 끝'),
});
// p 등장
gsap.from('.program p', {
	scrollTrigger: {
		trigger: '.program',
		start: 'top 50%',
		toggleActions: 'play none none none',
		onEnter: () => console.log('program p 애니메이션 시작'),
	},
	y: 40,
	opacity: 0,
	duration: 1,
	delay: 0.3,
	ease: 'power3.out',
	onComplete: () => console.log('program p 애니메이션 끝'),
});

// .works 섹션 가로 스크롤 등장 애니메이션 (이미지와 텍스트 분리)
const worksSections = document.querySelectorAll('.horizontal-scroll .works');
worksSections.forEach((section, i) => {
	const picture = section.querySelector('picture');
	const text = section.querySelector('.text');
	if (picture) {
		gsap.fromTo(
			picture,
			{ y: 80, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					containerAnimation: ScrollTrigger.getById('horizontalScroll'),
					start: 'center center',
					end: '+=200',
					markers: true,
					toggleActions: 'play none none none',
					// markers: true, // 필요시 활성화
				},
			}
		);
	}
	if (text) {
		gsap.fromTo(
			text,
			{ y: 80, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					containerAnimation: ScrollTrigger.getById('horizontalScroll'),
					start: 'center center',
					end: '+=200',
					markers: true,
					toggleActions: 'play none none none',
					// markers: true, // 필요시 활성화
				},
			}
		);
	}
});

// 가로 스크롤 트리거(ScrollTrigger 인스턴스에 id 부여)
const horizontal = document.querySelector('.horizontal-scroll');
if (horizontal) {
	const sections = gsap.utils.toArray('.horizontal-scroll .works');
	gsap.to(sections, {
		xPercent: -100 * (sections.length - 1),
		ease: 'none',
		scrollTrigger: {
			id: 'horizontalScroll',
			trigger: horizontal,
			pin: true,
			markers: true,
			scrub: 1,
			end: () => '+=' + horizontal.offsetWidth,
			anticipatePin: 1,
		},
	});
}
