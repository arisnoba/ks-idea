'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		const lenis = new Lenis({
			syncTouch: false,
			lerp: 0.1,
		});

		lenisRef.current = lenis;

		const onScroll = () => ScrollTrigger.update();
		lenis.on('scroll', onScroll);

		const ticker = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(ticker);
		gsap.ticker.lagSmoothing(0);

		// 페이지 로드 시 스냅 존에 있으므로 즉시 중단
		lenis.stop();

		return () => {
			lenis.off('scroll', onScroll);
			gsap.ticker.remove(ticker);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return lenisRef;
}
