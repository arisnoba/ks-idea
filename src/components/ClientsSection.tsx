'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ClientsSection.module.scss';

const rowVariants = {
	hidden: { y: '105%', opacity: 0 },
	visible: (index: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			delay: 0.12 + (index * 0.08),
			ease: [0.22, 1, 0.36, 1] as const,
		},
	}),
};

const clients = [
	'호카',
	'써코니',
	'세라젬',
	'피크',
	'배룩스',
	'쥬비스다이어트',
	'아이파크',
	'NH투자증권',
	'셀로',
	'iM뱅크',
	'컬럼비아스포츠웨어',
	'마인드마크',
	'기흥인터내셔널',
	'쟈뎅',
	'올프레쉬',
	'프로스펙스',
	'LG유플러스',
	'현대백화점',
	'웅진식품',
	'설해원',
	'하나자산',
	'전북은행',
	'굿지앤',
	'WMF',
	'놀부',
	'캐롤아시아',
	'메디톡스',
	'파파이스',
	'KT',
	'시원스쿨',
	'JTBC',
	'BHC',
	'AUDI',
	'파라다이스그룹',
	'몽벨',
	'잭울프스킨',
	'마임',
	'보건복지부',
	'Mnet',
	'해태음료',
	'웅진홀딩스',
	'웅진씽크북',
	'JP모간',
	'뉴욕생명',
	'진에어',
	'한국타이어',
	'G마켓',
	'영창악기',
	'CJ',
	'바디샾',
	'현대산업개발',
	'한국투자증권',
	'푸르덴셜생명',
	'넥슨',
	'보령제약',
	'한국씨티은행',
];

function areRowsEqual(previousRows: string[][], nextRows: string[][]) {
	if (previousRows.length !== nextRows.length) {
		return false;
	}

	return previousRows.every((row, rowIndex) => {
		const nextRow = nextRows[rowIndex];

		if (!nextRow || row.length !== nextRow.length) {
			return false;
		}

		return row.every((item, itemIndex) => item === nextRow[itemIndex]);
	});
}

export default function ClientsSection() {
	const [rows, setRows] = useState<string[][]>([]);
	const listRef = useRef<HTMLDivElement | null>(null);
	const measureRef = useRef<HTMLDivElement | null>(null);
	const measureItemRefs = useRef<Array<HTMLSpanElement | null>>([]);
	const isInView = useInView(listRef, { once: true, amount: 0.2 });

	const syncRows = useEffectEvent(() => {
		const nextRows: string[][] = [];
		let currentTop: number | null = null;

		clients.forEach((name, index) => {
			const node = measureItemRefs.current[index];

			if (!node) {
				return;
			}

			const nextTop = Math.round(node.offsetTop);

			if (currentTop === null || Math.abs(nextTop - currentTop) > 1) {
				nextRows.push([name]);
				currentTop = nextTop;
				return;
			}

			nextRows[nextRows.length - 1].push(name);
		});

		if (nextRows.length === 0) {
			return;
		}

		setRows((previousRows) => (areRowsEqual(previousRows, nextRows) ? previousRows : nextRows));
	});

	useEffect(() => {
		const measureNode = measureRef.current;

		if (!measureNode) {
			return;
		}

		const frameId = window.requestAnimationFrame(() => {
			syncRows();
		});

		const observer = new ResizeObserver(() => {
			syncRows();
		});

		observer.observe(measureNode);

		let isMounted = true;

		if ('fonts' in document) {
			document.fonts.ready.then(() => {
				if (!isMounted) {
					return;
				}

				syncRows();
			});
		}

		return () => {
			isMounted = false;
			window.cancelAnimationFrame(frameId);
			observer.disconnect();
		};
	}, []);

	return (
		<section className={`section-clients ${styles.clients}`}>
			<div className="container">
				<motion.h2
					className={`heading-xl ${styles.heading}`}
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}>
					Clients
				</motion.h2>
				<div className={styles.listWrap}>
					<div ref={listRef} className={styles.list}>
						{rows.map((row, rowIndex) => (
							<div key={row.join('-')} className={styles.rowMask}>
								<motion.div
									className={`${styles.row} ${row.length === 1 || rowIndex === rows.length - 1 ? styles.singleRow : ''}`}
									variants={rowVariants}
									custom={rowIndex}
									initial={isInView ? 'visible' : 'hidden'}
									animate={isInView ? 'visible' : 'hidden'}
								>
									{row.map((name) => (
										<span key={name} className={`body-base ${styles.client}`}>
											{name}
										</span>
									))}
								</motion.div>
							</div>
						))}
					</div>

					<div className={styles.measurement} aria-hidden="true">
						<div ref={measureRef} className={`${styles.list} ${styles.measureList}`}>
							{clients.map((name, index) => (
								<span
									key={name}
									ref={(node) => {
										measureItemRefs.current[index] = node;
									}}
									className={`body-base ${styles.measureWord}`}
								>
									{name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
