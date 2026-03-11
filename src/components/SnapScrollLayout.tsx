'use client';

import { useRef, ReactNode } from 'react';
import { useSnapScroll } from '@/hooks/useSnapScroll';
import styles from './SnapScrollLayout.module.scss';

interface SnapScrollLayoutProps {
	snapSections: ReactNode[];
	freeSections: ReactNode;
}

export default function SnapScrollLayout({ snapSections, freeSections }: SnapScrollLayoutProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	useSnapScroll({ totalSnaps: snapSections.length, trackRef });

	return (
		<>
			<div className={styles.snapViewport}>
				<div ref={trackRef} className={styles.snapTrack}>
					{snapSections.map((section, i) => (
						<div key={i} className={styles.snapSlide}>
							{section}
						</div>
					))}
				</div>
			</div>
			<div className={styles.freeZone}>
				{freeSections}
			</div>
		</>
	);
}
