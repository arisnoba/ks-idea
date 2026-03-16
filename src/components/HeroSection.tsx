'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
			staggerChildren: 0.1,
			delayChildren: 0.4,
		},
	},
};

const titleVariants = {
	hidden: { y: '105%', opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1.2,
			delay: 0.2, // Start slightly after load
			ease: [0.16, 1, 0.3, 1] as const, // Premium ease-out
		},
	},
};

const lineVariants = {
	hidden: { y: '105%', opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1] as const, // Smooth deceleration
		},
	},
};

export default function HeroSection() {
	return (
		<section className={`section-hero ${styles.hero}`} id="about">
			<div className={`container ${styles.heroInner}`}>
				<Link href="/" className={styles.mobileLogo} aria-label="KS IDEA">
					<Image src="/images/logo.svg" alt="KS IDEA" width={120} height={40} />
				</Link>
				<div className={styles.about}>
					{/* 타이틀 - Masked Reveal */}
					<div className={styles.headingWrapper}>
						<motion.h1
							className={`heading-xl ${styles.aboutHeading}`}
							variants={titleVariants}
							initial="hidden"
							animate="visible"
						>
							The Brand Clinic
						</motion.h1>
					</div>

					{/* 설명 라인 한 줄씩 등장 - Masked Reveal */}
					<motion.div
						className={styles.aboutDesc}
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{lines.map((line, i) => (
							<div key={i} className={styles.lineWrapper}>
								<motion.p variants={lineVariants}>
									{line}
								</motion.p>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
