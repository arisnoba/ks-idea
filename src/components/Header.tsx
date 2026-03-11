'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
	return (
		<header className={`header ${styles.header}`}>
			<nav className={`container ${styles.nav}`}>
				<Link href="/" className={styles.logo}>
					<Image src="/images/logo.svg" alt="KS IDEA" width={120} height={40} />
				</Link>
			</nav>
		</header>
	);
}
