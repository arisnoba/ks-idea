'use client';

import type { CSSProperties } from 'react';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

function getExpandedPaddingTop(viewportWidth: number) {
	return Math.min(Math.max(viewportWidth * 0.05, 60), 120);
}

export default function Header() {
	const [isScrolling, setIsScrolling] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [paddingTop, setPaddingTop] = useState(60);
	const frameRef = useRef<number | null>(null);
	const scrollStopTimerRef = useRef<number | null>(null);

	const syncScrollState = useEffectEvent((active: boolean) => {
		const expandedPaddingTop = getExpandedPaddingTop(window.innerWidth);
		const reductionDistance = expandedPaddingTop / 2;
		const nextProgress = reductionDistance === 0 ? 1 : Math.min(window.scrollY / reductionDistance, 1);
		const nextPaddingTop = expandedPaddingTop - (reductionDistance * nextProgress);

		setScrollProgress((prev) => (Math.abs(prev - nextProgress) < 0.001 ? prev : nextProgress));
		setPaddingTop((prev) => (Math.abs(prev - nextPaddingTop) < 0.25 ? prev : nextPaddingTop));

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

			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
			}

			if (scrollStopTimerRef.current !== null) {
				window.clearTimeout(scrollStopTimerRef.current);
			}
		};
	}, []);

	const headerStyle = {
		'--header-padding-top': `${paddingTop.toFixed(2)}px`,
	} as CSSProperties;

	return (
		<header
			className={`header ${styles.header}`}
			data-scrolling={isScrolling}
			data-scroll-progress={scrollProgress.toFixed(1)}
			style={headerStyle}
		>
			<nav className={`container ${styles.nav}`}>
				<Link href="/" className={styles.logo}>
					<Image src="/images/logo.svg" alt="KS IDEA" width={120} height={40} />
				</Link>
			</nav>
		</header>
	);
}
