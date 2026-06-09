'use client';

import { motion } from 'framer-motion';
import styles from './BrandDiagnosisSection.module.scss';

interface ParagraphBlock {
	lines: string[];
	isBold?: boolean;
}

const contentData: ParagraphBlock[] = [
	{
		lines: [
			'하루에 태어나는 브랜드는 수천 개,',
			'그러나 80% 이상은 3년 안에 사라집니다'
		],
		isBold: true
	},
	{
		lines: [
			'사라지는 브랜드의 이유는 똑같습니다',
			'명확한 진단 없이 트렌드만 쫓아 비용과 시간을 쏟아부었기 때문입니다'
		]
	},
	{
		lines: [
			"브랜딩은 '예쁜 로고'를 만드는 것이 아니라,",
			"시장에서 살아남을 '이유'를 만드는 일입니다",
			'밑 빠진 독에 마케팅 비용을 붓기 전에,',
			'이제, 정확한 진단부터 받아보세요'
		]
	},
	{
		lines: [
			'KS IDEA는',
			'시장 데이터, 경쟁 구도, 페르소나 인사이트 탐구 등을 통해',
			'브랜드의 숨겨진 가능성을 정밀하게 분석합니다',
			'그리고 시장을 흔들 강력한 단 하나의 무기,',
			"'브랜드 내러티브'를 도출해 드립니다",
			'이야기(Narrative)가 없는 브랜드는 힘이 없습니다'
		]
	},
	{
		lines: [
			'KS IDEA가 제공하는 무료 브랜드 진단으로,',
			'브랜드의 강력한 무기를 가지십시오'
		],
		
	}
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15
		}
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.215, 0.61, 0.355, 1] as const // cubic-bezier for smooth deceleration
		}
	}
};

export default function BrandDiagnosisSection() {
	return (
		<section className={`section-diagnosis ${styles.diagnosis}`}>
			<div className="container">
				<motion.div
					className={styles.inner}
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					{/* 타이틀 */}
					<motion.h2 className={`heading-lg ${styles.title}`} variants={itemVariants}>
						무료 브랜드 진단 서비스
					</motion.h2>

					{/* 본문 콘텐츠 */}
					<div className={styles.content}>
						{contentData.map((block, blockIdx) => (
							<motion.div
								key={blockIdx}
								className={`${styles.paragraph} ${block.isBold ? styles.boldBlock : ''}`}
								variants={itemVariants}
							>
								{block.lines.map((line, lineIdx) => (
									<p key={lineIdx} className="body-base">
										{line}
									</p>
								))}
							</motion.div>
						))}
					</div>

					{/* 각주 */}
					<motion.div className={styles.footnote} variants={itemVariants}>
						<p className="caption">
							*무료브랜드진단 대상은 KS IDEA에서 정한 기준에 부합하는
						</p>
						<p className="caption">
							기업이나 브랜드 중에서 선별합니다
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
