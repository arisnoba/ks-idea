'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

function getExpandedPaddingTop(viewportWidth: number) {
	return Math.min(Math.max(viewportWidth * 0.05, 60), 120);
}

export default function Header() {
	const [isScrolling, setIsScrolling] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const headerRef = useRef<HTMLElement | null>(null);
	const frameRef = useRef<number | null>(null);
	const scrollStopTimerRef = useRef<number | null>(null);
	const progressTweenRef = useRef<gsap.core.Tween | null>(null);
	const progressStateRef = useRef({ value: 0 });
	const targetProgressRef = useRef(0);
	const roundedProgressRef = useRef(0);
	const paddingMetricsRef = useRef({
		expandedPaddingTop: 60,
		reductionDistance: 30,
	});

	const syncPaddingMetrics = useEffectEvent(() => {
		const expandedPaddingTop = getExpandedPaddingTop(window.innerWidth);

		paddingMetricsRef.current = {
			expandedPaddingTop,
			reductionDistance: expandedPaddingTop / 2,
		};
	});

	const renderHeaderPadding = useEffectEvent((progress: number) => {
		const header = headerRef.current;

		if (!header) {
			return;
		}

		const { expandedPaddingTop, reductionDistance } = paddingMetricsRef.current;
		const nextPaddingTop = expandedPaddingTop - (reductionDistance * progress);
		const nextRoundedProgress = Number(progress.toFixed(1));

		header.style.paddingTop = `${nextPaddingTop.toFixed(2)}px`;

		if (roundedProgressRef.current !== nextRoundedProgress) {
			roundedProgressRef.current = nextRoundedProgress;
			setScrollProgress(nextRoundedProgress);
		}
	});

	const animateHeaderProgress = useEffectEvent((nextProgress: number, immediate: boolean) => {
		if (Math.abs(targetProgressRef.current - nextProgress) < 0.001 && !immediate) {
			return;
		}

		targetProgressRef.current = nextProgress;
		progressTweenRef.current?.kill();

		if (immediate) {
			progressStateRef.current.value = nextProgress;
			renderHeaderPadding(nextProgress);
			return;
		}

		progressTweenRef.current = gsap.to(progressStateRef.current, {
			value: nextProgress,
			duration: nextProgress > progressStateRef.current.value ? 1.15 : 0.9,
			ease: nextProgress > progressStateRef.current.value ? 'expo.out' : 'power3.out',
			overwrite: true,
			onUpdate: () => {
				renderHeaderPadding(progressStateRef.current.value);
			},
			onComplete: () => {
				progressTweenRef.current = null;
				renderHeaderPadding(nextProgress);
			},
		});
	});

	const syncScrollState = useEffectEvent((active: boolean) => {
		syncPaddingMetrics();

		const { reductionDistance } = paddingMetricsRef.current;
		const nextProgress = reductionDistance === 0 ? 1 : Math.min(window.scrollY / reductionDistance, 1);

		animateHeaderProgress(nextProgress, !active);

		if (!active) {
			return;
		}

		setIsScrolling(true);

		if (scrollStopTimerRef.current !== null) {
			window.clearTimeout(scrollStopTimerRef.current);
		}

		scrollStopTimerRef.current = window.setTimeout(() => {
			setIsScrolling(false);
			scrollStopTimerRef.current = null;
		}, 140);
	});

	useEffect(() => {
		const handleScroll = () => {
			if (frameRef.current !== null) {
				return;
			}

			frameRef.current = window.requestAnimationFrame(() => {
				frameRef.current = null;
				syncScrollState(true);
			});
		};

		const handleResize = () => {
			syncScrollState(false);
		};

		syncScrollState(false);
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			progressTweenRef.current?.kill();

			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
			}

			if (scrollStopTimerRef.current !== null) {
				window.clearTimeout(scrollStopTimerRef.current);
			}
		};
	}, []);

	return (
		<header
			ref={headerRef}
			className={`header ${styles.header}`}
			data-scrolling={isScrolling}
			data-scroll-progress={scrollProgress.toFixed(1)}
		>
			<nav className={`container ${styles.nav}`}>
				<Link href="/" className={styles.logo}>
					<Image src="/images/logo.svg" alt="KS IDEA" width={120} height={40} />
				</Link>
			</nav>
		</header>
	);
}
