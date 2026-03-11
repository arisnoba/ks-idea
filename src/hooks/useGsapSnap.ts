'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapSnap(totalSnaps: number) {
	const snapSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const currentIndexRef = useRef(0);
	const isAutoScrollingRef = useRef(false);

	useEffect(() => {
		const handleResize = () => ScrollTrigger.refresh();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useLayoutEffect(() => {
		const sections = snapSectionRefs.current.slice(0, totalSnaps).filter((section): section is HTMLDivElement => section !== null);

		if (sections.length === 0) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.05,
			smoothWheel: true,
			syncTouch: false,
			overscroll: false,
		});
		const triggers: ScrollTrigger[] = [];
		const handleLenisScroll = () => ScrollTrigger.update();
		const handleTick = (time: number) => {
			lenis.raf(time * 1000);
		};
		const getClosestIndex = () => {
			const scrollY = window.scrollY;
			let closestIndex = 0;
			let closestDistance = Number.POSITIVE_INFINITY;

			sections.forEach((section, index) => {
				const distance = Math.abs(section.offsetTop - scrollY);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			return closestIndex;
		};
		const goToSection = (index: number) => {
			const targetSection = sections[index];

			if (!targetSection) {
				return;
			}

			if (currentIndexRef.current === index && Math.abs(window.scrollY - targetSection.offsetTop) < 2) {
				return;
			}

			isAutoScrollingRef.current = true;
			currentIndexRef.current = index;

			lenis.scrollTo(targetSection, {
				duration: 0.85,
				lock: true,
				force: true,
				onComplete: () => {
					isAutoScrollingRef.current = false;
					currentIndexRef.current = index;
				},
			});
		};

		lenis.on('scroll', handleLenisScroll);
		gsap.ticker.add(handleTick);
		gsap.ticker.lagSmoothing(0);
		currentIndexRef.current = getClosestIndex();

		sections.forEach((section, index) => {
			triggers.push(
				ScrollTrigger.create({
					trigger: section,
					start: 'top bottom',
					onEnter: () => {
						if (isAutoScrollingRef.current || index <= currentIndexRef.current) {
							return;
						}

						goToSection(index);
					},
				})
			);

			triggers.push(
				ScrollTrigger.create({
					trigger: section,
					start: 'bottom bottom',
					onEnterBack: () => {
						if (isAutoScrollingRef.current || index >= currentIndexRef.current) {
							return;
						}

						goToSection(index);
					},
				})
			);
		});

		ScrollTrigger.refresh();

		return () => {
			triggers.forEach((trigger) => trigger.kill());
			gsap.ticker.remove(handleTick);
			lenis.off('scroll', handleLenisScroll);
			lenis.destroy();
			isAutoScrollingRef.current = false;
		};
	}, [totalSnaps]);

	const setSnapSectionRef = (index: number) => (node: HTMLDivElement | null) => {
		snapSectionRefs.current[index] = node;
	};

	return { setSnapSectionRef };
}
