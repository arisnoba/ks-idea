document.addEventListener('DOMContentLoaded', function () {
	// Contact 페이지 애니메이션 요소 선택
	const sectionHeading = document.querySelector('.contact-info .section-heading');
	const links = document.querySelectorAll('.contact-info .link');

	// 초기 상태 설정 - 모든 요소 투명하고 아래에서 위로 이동하도록
	gsap.set(sectionHeading, { opacity: 0, y: 40 });
	gsap.set(links, { opacity: 0, y: 0 });

	// 애니메이션 타임라인 생성
	const tl = gsap.timeline({ delay: 0.3 });

	// 순차적으로 요소들 애니메이션 적용
	tl.to(sectionHeading, { opacity: 1, y: 0, duration: 0.7, ease: 'power1.Out' }).to(
		links,
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			ease: 'none',
			stagger: 0.2, // 각 링크 사이에 0.2초 간격으로 애니메이션 적용
		},
		'-=0.3'
	); // 이전 애니메이션이 끝나기 0.3초 전에 시작
});
