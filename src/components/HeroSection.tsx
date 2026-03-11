'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.scss';

const lines = [
	'성장하지 않는 브랜드는 사라진다',
	'성장이 멈춘 브랜드가 해야 할 일은',
	'그 원인을 찾아 그에 맞는 치료법을 적용하는 것이다',
	"성장이 멈춘 지점을 우리는 'Plateau'라 부른다",
	'Beyond the Plateau,',
	'이것이 The Brand Clinic의 존재 이유이다',
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.18,
			delayChildren: 0.82,
		},
	},
};

const lineVariants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: 'easeOut' as const },
	},
};

export default function HeroSection() {
	return (
		<section className={`section-hero ${styles.hero}`} id="about">
			<div className="container">
				<div className={styles.about}>
					{/* 타이틀 */}
					<motion.h2
						className={`heading-xl ${styles.aboutHeading}`}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.7 }}
					>
						The Brand Clinic
					</motion.h2>

					{/* 설명 라인 한 줄씩 등장 */}
					<motion.div
						className={styles.aboutDesc}
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-80px' }}
					>
						{lines.map((line, i) => (
							<motion.p key={i} variants={lineVariants}>
								{line}
							</motion.p>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
