'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Footer.module.scss';

const footerLinkRevealStyle = {
	willChange: 'transform, opacity',
	backfaceVisibility: 'hidden' as const,
	WebkitBackfaceVisibility: 'hidden' as const,
};

const footerLinkTransformTemplate = (_: unknown, generatedTransform: string) => (generatedTransform ? `${generatedTransform} translateZ(0)` : 'translateZ(0)');

export default function Footer() {
	return (
		<footer className={`footer ${styles.footer}`} id="contact">
			<div className="container">
				<div className={styles.content}>
					{/* SNS Links */}
					<div className={`flex gap-15 flex-col md:flex-row ${styles.sns}`}>
						<motion.a
							href="https://www.instagram.com/brand_clinic_ksidea/"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.snsLink}
							aria-label="Instagram"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.55 }}
							style={footerLinkRevealStyle}
							transformTemplate={footerLinkTransformTemplate}>
							<Image src="/assets/images/instagram.svg" alt="Instagram" width={28} height={28} />
							<span className={`body-base ${styles.snsLabel}`}>인스타그램 보기</span>
						</motion.a>
						<motion.a
							href="https://www.youtube.com/@mr.good_b"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.snsLink}
							aria-label="YouTube"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.55, delay: 0.08 }}
							style={footerLinkRevealStyle}
							transformTemplate={footerLinkTransformTemplate}>
							<Image src="/assets/images/youtube.svg" alt="YouTube" width={28} height={28} />
							<span className={`body-base ${styles.snsLabel}`}>유튜브 보기</span>
						</motion.a>
					</div>

					{/* Contact */}
					<div className={styles.contact}>
						<motion.h2
							className={`heading-xl ${styles.contactHeading}`}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.6 }}>
							Contact
						</motion.h2>
						<motion.a
							href="mailto:ksidea@ksidea.co.kr"
							className={styles.contactMail}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.55, delay: 0.08 }}
							style={footerLinkRevealStyle}
							transformTemplate={footerLinkTransformTemplate}>
							ksidea@ksidea.co.kr
						</motion.a>
						<motion.a
							href="https://naver.me/xucjMxP9"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.contactMap}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.55, delay: 0.16 }}
							style={footerLinkRevealStyle}
							transformTemplate={footerLinkTransformTemplate}>
							강남구 봉은사로 306 NK타워 9층
						</motion.a>
					</div>
				</div>
			</div>
		</footer>
	);
}
