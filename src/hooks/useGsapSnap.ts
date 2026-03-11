'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapSnap(totalSnaps: number) {
	const stageRef = useRef<HTMLDivElement>(null);
	const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		let previousWidth = window.innerWidth;
		let previousHeight = window.innerHeight;
		let rafId = 0;

		const setAppHeight = (height: number) => {
			document.documentElement.style.setProperty('--app-height', `${height}px`);
		};

		const commitViewportChange = () => {
			const nextWidth = window.innerWidth;
			const nextHeight = window.innerHeight;
			const widthChanged = nextWidth !== previousWidth;
			const heightDelta = Math.abs(nextHeight - previousHeight);

			// 모바일 주소창 표시/숨김(50px 미만)은 무시
			const shouldUpdate = widthChanged || heightDelta > 120;

			if (!shouldUpdate) return;

			previousWidth = nextWidth;
			previousHeight = nextHeight;
			setAppHeight(nextHeight);
			ScrollTrigger.refresh();
		};

		const handleResize = () => {
			cancelAnimationFrame(rafId);
			rafId = window.requestAnimationFrame(commitViewportChange);
		};

		setAppHeight(previousHeight);

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
		};
	}, []);

	useLayoutEffect(() => {
		const stage = stageRef.current;
		const panels = panelRefs.current
			.slice(0, totalSnaps)
			.filter((panel): panel is HTMLDivElement => panel !== null);

		if (!stage || panels.length === 0) return;

		const ctx = gsap.context(() => {
			let currentIndex = 0;
			let animating = false;
			let wasInsideSnapZone = false;
			let lastScrollY = window.scrollY;
			let observer: ReturnType<typeof ScrollTrigger.observe> | null = null;

			const syncWindowScroll = (y: number) => window.scrollTo(0, Math.round(y));

			const getTravelDuration = (fromY: number, toY: number) =>
				gsap.utils.clamp(0.9, 1.2, Math.abs(toY - fromY) / 800);

			const stageTop = () => stage.offsetTop;
			const stageBottom = () => stage.offsetTop + stage.offsetHeight;

			const animateStageScroll = (targetY: number, onComplete?: () => void) => {
				const startY = window.scrollY;
				const scrollState = { y: startY };

				animating = true;
				observer?.disable();

				gsap.to(scrollState, {
					y: targetY,
					duration: getTravelDuration(startY, targetY),
					ease: 'power2.inOut',
					onUpdate: () => {
						syncWindowScroll(scrollState.y);
						ScrollTrigger.update();
					},
					onComplete: () => {
						animating = false;
						syncWindowScroll(targetY);
						onComplete?.();
					},
				});
			};

			const releaseToContent = () => animateStageScroll(stageBottom() + 2);
			const enterFromContent = () => animateStageScroll(stageTop(), () => observer?.enable());

			const syncPanelPositions = (activeIndex: number) => {
				panels.forEach((panel, index) => {
					gsap.set(panel, {
						yPercent: index < activeIndex ? -100 : index > activeIndex ? 100 : 0,
						zIndex: index === activeIndex ? 2 : 1,
					});
				});
			};

			const updatePanelState = (nextIndex: number, direction: 1 | -1) => {
				if (animating || nextIndex === currentIndex) return;
				if (nextIndex < 0) return;

				if (nextIndex >= panels.length) {
					releaseToContent();
					return;
				}

				animating = true;
				const currentPanel = panels[currentIndex];
				const nextPanel = panels[nextIndex];

				panels.forEach((panel, index) => {
					if (index !== currentIndex && index !== nextIndex) {
						gsap.set(panel, {
							yPercent: index < nextIndex ? -100 : 100,
							zIndex: 1,
						});
					}
				});

				gsap.set(nextPanel, {
					yPercent: direction === 1 ? 100 : -100,
					zIndex: 3,
				});
				gsap.set(currentPanel, { zIndex: 2 });

				gsap.timeline({
					defaults: { duration: 0.95, ease: 'power2.inOut' },
					onComplete: () => {
						currentIndex = nextIndex;
						syncPanelPositions(currentIndex);
						animating = false;
					},
				})
					.to(currentPanel, { yPercent: direction === 1 ? -100 : 100 }, 0)
					.to(nextPanel, { yPercent: 0 }, 0);
			};

			const syncObserver = () => {
				const insideSnapZone = window.scrollY < stageBottom() - 2;
				const scrollingUp = window.scrollY < lastScrollY;

				if (!animating && insideSnapZone && !wasInsideSnapZone && scrollingUp && window.scrollY > stageTop()) {
					enterFromContent();
					wasInsideSnapZone = insideSnapZone;
					lastScrollY = window.scrollY;
					return;
				}

				if (insideSnapZone) {
					observer?.enable();
				} else {
					observer?.disable();
				}

				wasInsideSnapZone = insideSnapZone;
				lastScrollY = window.scrollY;
			};

			syncPanelPositions(0);

			// wheelSpeed: -1 로 wheel/touch 방향을 통일
			// 휠 아래 / 터치 위로 쓸기 → onUp → 다음 패널
			// 휠 위   / 터치 아래로 쓸기 → onDown → 이전 패널
			observer = ScrollTrigger.observe({
				target: window,
				type: 'wheel,touch',
				wheelSpeed: -1,
				preventDefault: true,
				lockAxis: true,
				tolerance: 10,
				dragMinimum: 10,
				onUp: () => updatePanelState(currentIndex + 1, 1),
				onDown: () => updatePanelState(currentIndex - 1, -1),
			});

			window.addEventListener('scroll', handleScroll, { passive: true });
			syncObserver();
			ScrollTrigger.refresh();

			return () => {
				window.removeEventListener('scroll', handleScroll);
				observer?.kill();
			};

			function handleScroll() {
				syncObserver();
			}
		}, stage);

		return () => ctx.revert();
	}, [totalSnaps]);

	const setPanelRef = (index: number) => (node: HTMLDivElement | null) => {
		panelRefs.current[index] = node;
	};

	return { stageRef, setPanelRef };
}
