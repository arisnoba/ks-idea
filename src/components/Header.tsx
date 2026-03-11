'use client';

// import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
	// const [isMenuOpen, setIsMenuOpen] = useState(false);

	// const navItems = [
	// 	{ label: 'About', href: '#about' },
	// 	{ label: 'Work', href: '#work' },
	// 	{ label: 'Contact', href: '#contact' },
	// ];

	// const handleNavClick = (href: string) => {
	// 	setIsMenuOpen(false);
	// 	const el = document.querySelector(href);
	// 	el?.scrollIntoView({ behavior: 'smooth' });
	// };

	return (
		<header className={`header ${styles.header}`}>
			<nav className={`container ${styles.nav}`}>
				<Link href="/" className={styles.logo}>
					<Image src="/images/logo.svg" alt="KS IDEA" width={120} height={40} />
				</Link>

				{/* Desktop nav */}
				{/* <ul className={styles.navMenu}>
					{navItems.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(item.href);
								}}
								className={styles.navLink}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul> */}

				{/* Mobile hamburger */}
				{/* <button
					className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="메뉴 열기"
					type="button"
				>
					<span className={styles.bar} />
					<span className={styles.bar} />
				</button> */}

				{/* Mobile drawer */}
				{/* {isMenuOpen && (
					<>
						<div className={styles.drawer}>
							<ul>
								{navItems.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											onClick={(e) => {
												e.preventDefault();
												handleNavClick(item.href);
											}}
											className={styles.drawerLink}
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div
							className={styles.drawerDim}
							onClick={() => setIsMenuOpen(false)}
						/>
					</>
				)} */}
			</nav>
		</header>
	);
}
