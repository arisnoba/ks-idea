gsap.registerPlugin(ScrollTrigger);

// 1. 세로 fullpage swiper
const verticalSections = gsap.utils.toArray('.vertical');
verticalSections.forEach((section, i) => {
	ScrollTrigger.create({
		trigger: section,
		start: 'top top',
		end: 'bottom top',
		pin: true,
		snap: {
			snapTo: 1,
			duration: { min: 0.2, max: 0.5 },
			ease: 'power1.inOut',
		},
		// markers: true,
	});
});

// 2. 가로 fullpage swiper
const horizontalScroll = document.querySelector('.horizontal-scroll');
if (horizontalScroll) {
	const horizontalSections = gsap.utils.toArray('.horizontal-scroll .horizontal');
	const totalSections = horizontalSections.length;

	gsap.to(horizontalSections, {
		xPercent: -100 * (totalSections - 1),
		ease: 'none',
		scrollTrigger: {
			trigger: horizontalScroll,
			start: 'top top',
			end: () => '+=' + horizontalScroll.offsetWidth * (totalSections - 1),
			pin: true,
			scrub: 1,
			snap: {
				snapTo: 1 / (totalSections - 1),
				duration: { min: 0.2, max: 0.5 },
				ease: 'power1.inOut',
			},
			anticipatePin: 1,
			// markers: true,
			horizontal: true,
		},
	});
}

document.body.style.overflowX = 'hidden';
