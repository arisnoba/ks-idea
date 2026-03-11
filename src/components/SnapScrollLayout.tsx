'use client';

import type { ReactNode } from 'react';
import { useGsapSnap } from '@/hooks/useGsapSnap';
import styles from './SnapScrollLayout.module.scss';

interface SnapScrollLayoutProps {
	snapSections: ReactNode[];
	freeSections: ReactNode;
}

export default function SnapScrollLayout({ snapSections, freeSections }: SnapScrollLayoutProps) {
	const { setSnapSectionRef } = useGsapSnap(snapSections.length);

	return (
		<div className={styles.layout}>
			{snapSections.map((section, i) => (
				<div key={i} ref={setSnapSectionRef(i)} className={styles.snapSection}>
					{section}
				</div>
			))}
			<div className={styles.freeSections}>
				{freeSections}
			</div>
		</div>
	);
}
