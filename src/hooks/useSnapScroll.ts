'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type ScrollState = 'SNAP_ACTIVE' | 'SNAP_TRANSITIONING' | 'FREE_SCROLL';

interface UseSnapScrollOptions {
	totalSnaps: number;
	trackRef: RefObject<HTMLDivElement | null>;
}

export function useSnapScroll({ totalSnaps, trackRef }: UseSnapScrollOptions) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isSnapMode, setIsSnapMode] = useState(true);

	const stateRef = useRef<ScrollState>('SNAP_ACTIVE');
	const indexRef = useRef(0);
	const cooldownRef = useRef(false);
	const touchStartRef = useRef({ y: 0, time: 0 });

	useEffect(() => {
		document.documentElement.style.overflow = 'hidden';

		const applyTransform = (index: number) => {
			if (trackRef.current) {
				trackRef.current.style.transform = `translateY(calc(${index} * -100dvh))`;
			}
		};

		applyTransform(0);

		const enterFreeScroll = () => {
			stateRef.current = 'FREE_SCROLL';
			setIsSnapMode(false);
			document.documentElement.style.overflow = '';
		};

		const exitFreeScroll = () => {
			stateRef.current = 'SNAP_ACTIVE';
			setIsSnapMode(true);
			document.documentElement.style.overflow = 'hidden';
		};

		const navigate = (direction: 1 | -1) => {
			if (cooldownRef.current || stateRef.current === 'SNAP_TRANSITIONING') return;

			const newIndex = indexRef.current + direction;

			if (direction > 0 && newIndex >= totalSnaps) {
				// Last snap section → enter free scroll
				stateRef.current = 'SNAP_TRANSITIONING';
				cooldownRef.current = true;
				requestAnimationFrame(() => {
					enterFreeScroll();
					setTimeout(() => {
						cooldownRef.current = false;
					}, 400);
				});
				return;
			}

			if (newIndex < 0) return;

			stateRef.current = 'SNAP_TRANSITIONING';
			cooldownRef.current = true;
			indexRef.current = newIndex;
			setCurrentIndex(newIndex);
			applyTransform(newIndex);

			setTimeout(() => {
				cooldownRef.current = false;
				stateRef.current = 'SNAP_ACTIVE';
			}, 800);
		};

		const handleWheel = (e: WheelEvent) => {
			// Ignore horizontal scroll (browser back/forward gestures)
			if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

			if (stateRef.current === 'FREE_SCROLL') {
				if (window.scrollY <= 0 && e.deltaY < 0) {
					e.preventDefault();
					indexRef.current = totalSnaps - 1;
					setCurrentIndex(totalSnaps - 1);
					applyTransform(totalSnaps - 1);
					exitFreeScroll();
				}
				return;
			}

			e.preventDefault();
			navigate(e.deltaY > 0 ? 1 : -1);
		};

		const handleTouchStart = (e: TouchEvent) => {
			touchStartRef.current = { y: e.touches[0].clientY, time: Date.now() };
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const endY = e.changedTouches[0].clientY;
			const deltaY = touchStartRef.current.y - endY; // positive = swipe up = scroll forward
			const elapsed = Date.now() - touchStartRef.current.time;
			const velocity = Math.abs(deltaY) / elapsed;

			if (stateRef.current === 'FREE_SCROLL') {
				if (window.scrollY <= 0 && deltaY < 0 && (Math.abs(deltaY) >= 50 || velocity >= 0.3)) {
					indexRef.current = totalSnaps - 1;
					setCurrentIndex(totalSnaps - 1);
					applyTransform(totalSnaps - 1);
					exitFreeScroll();
				}
				return;
			}

			if (stateRef.current === 'SNAP_TRANSITIONING') return;
			if (Math.abs(deltaY) < 50 && velocity < 0.3) return;

			navigate(deltaY > 0 ? 1 : -1);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (stateRef.current !== 'FREE_SCROLL') {
				e.preventDefault();
			}
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });

		return () => {
			document.documentElement.style.overflow = '';
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('touchmove', handleTouchMove);
		};
	}, [totalSnaps, trackRef]);

	return { currentIndex, isSnapMode };
}
