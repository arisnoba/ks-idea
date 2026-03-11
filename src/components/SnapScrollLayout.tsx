'use client';

import type { ReactNode } from 'react';
import { useGsapSnap } from '@/hooks/useGsapSnap';
import { useLenis } from '@/hooks/useLenis';
import styles from './SnapScrollLayout.module.scss';

interface SnapScrollLayoutProps {
	snapSections: ReactNode[];
	freeSections: ReactNode;
}

export default function SnapScrollLayout({ snapSections, freeSections }: SnapScrollLayoutProps) {
	const lenisRef = useLenis();
	const { stageRef, setPanelRef } = useGsapSnap(snapSections.length, lenisRef);

	return (
		<div className={styles.layout}>
			<div ref={stageRef} className={styles.snapStage}>
				{snapSections.map((section, i) => (
					<div key={i} ref={setPanelRef(i)} className={styles.snapPanel}>
						{section}
					</div>
				))}
			</div>
			<div className={styles.freeSections}>
				{freeSections}
			</div>
		</div>
	);
}
