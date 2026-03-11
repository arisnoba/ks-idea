'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
	return (
		<footer className={`footer ${styles.footer}`} id="contact">
			<div className="container">
				<motion.div className={styles.content} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6 }}>
					{/* SNS Links */}
					<div className={`flex gap-15 flex-col md:flex-row ${styles.sns}`}>
						<a href="https://www.instagram.com/brand_clinic_ksidea/" target="_blank" rel="noopener noreferrer" className={styles.snsLink} aria-label="Instagram">
							<Image src="/images/instagram.svg" alt="Instagram" width={28} height={28} />
							<span className={styles.snsLabel}>인스타그램 보기</span>
						</a>
						<a href="https://www.youtube.com/@mr.good_b" target="_blank" rel="noopener noreferrer" className={styles.snsLink} aria-label="YouTube">
							<Image src="/images/youtube.svg" alt="YouTube" width={28} height={28} />
							<span className={styles.snsLabel}>유튜브 보기</span>
						</a>
					</div>

					{/* Contact */}
					<div className={styles.contact}>
						<motion.h2 className={`heading-xl ${styles.contactHeading}`}>Contact</motion.h2>
						<a href="mailto:ksidea@ksidea.co.kr" className={styles.contactMail}>
							ksidea@ksidea.co.kr
						</a>
						<a href="https://naver.me/xucjMxP9" target="_blank" rel="noopener noreferrer" className={styles.contactMap}>
							강남구 봉은사로 306 NK타워 9층
						</a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
