'use client';

import { motion } from 'framer-motion';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
	return (
		<section className={`section-hero ${styles.hero}`} id="about">
			<div className="container">
				{/* About: The Brand Clinic */}
				<motion.div
					className={styles.about}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.7, delay: 0.1 }}>
					<h2 className={`heading-xl ${styles.aboutHeading}`}>The Brand Clinic</h2>
					<div className={styles.aboutDesc}>
						<p>
							성장하지 않는 브랜드는 사라진다 <br />
							성장이 멈춘 브랜드가 해야 할 일은 <br />그 원인을 찾아 그에 맞는 치료법을 적용하는 것이다 <br />
							성장이 멈춘 지점을 우리는 ‘Plateau’라 부른다 <br />
							Beyond the Plateau, <br />
							이것이 The Brand Clinic의 존재 이유이다
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
