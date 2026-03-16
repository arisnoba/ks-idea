'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './not-found.module.scss';

export default function NotFound() {
	return (
		<main className={styles.page}>
			<nav className={`container ${styles.nav}`}>
				<Link href='/' className={styles.logo}>
					<Image src='/assets/images/logo.svg' alt='KS IDEA' width={120} height={40} />
				</Link>
			</nav>

			<div className={`container ${styles.content}`}>
				<motion.p
					className={styles.label}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					진단 코드
				</motion.p>

				<motion.h1
					className={styles.code}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
					aria-label='404'
				>
					404
				</motion.h1>

				<motion.h2
					className={styles.title}
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
				>
					페이지를 찾을 수 없습니다
				</motion.h2>

				<motion.p
					className={styles.description}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
				>
					요청하신 페이지가 이동되었거나 삭제되었습니다.
					<br />
					정확한 주소를 다시 확인해 주세요.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
				>
					<Link href='/' className={styles.homeLink}>
						홈으로 돌아가기
					</Link>
				</motion.div>
			</div>
		</main>
	);
}
