import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/styles/scss/_typography.scss';

const SITE_URL = 'https://ksidea.co.kr'; // 실제 배포될 도메인으로 변경 필요

export const viewport: Viewport = {
	themeColor: '#000000',
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	title: {
		default: 'KS IDEA | The Brand Clinic',
		template: '%s | KS IDEA',
	},
	description: '성장이 멈춘 브랜드를 위한 정밀 진단과 치료, 브랜드 성장 연구소 KS IDEA입니다. Beyond the Plateau, The Brand Clinic.',
	keywords: ['KS IDEA', '케이에스아이디어', '브랜드연구소', '브랜드컨설팅', '브랜드진단', '마케팅전략', '브랜드성장', 'The Brand Clinic'],
	authors: [{ name: 'KS IDEA' }],
	creator: 'KS IDEA',
	publisher: 'KS IDEA',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'KS IDEA | The Brand Clinic',
		description: '성장이 멈춘 브랜드를 위한 정밀 진단과 치료, 브랜드 성장 연구소 KS IDEA',
		url: SITE_URL,
		siteName: 'KS IDEA',
		images: [
			{
				url: '/assets/images/img-og.png',
				width: 1200,
				height: 630,
				alt: 'KS IDEA - The Brand Clinic',
			},
		],
		locale: 'ko_KR',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'KS IDEA | The Brand Clinic',
		description: '브랜드 성장 연구소 KS IDEA - Beyond the Plateau',
		images: ['/assets/images/img-og.png'],
	},
	icons: {
		icon: [
			{ url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/assets/favicon/favicon.ico' },
		],
		shortcut: '/assets/favicon/favicon.ico',
		apple: [{ url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
	},
	manifest: '/assets/favicon/site.webmanifest',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'KS IDEA',
		url: SITE_URL,
		logo: `${SITE_URL}/assets/images/logo.svg`,
		description: '성장이 멈춘 브랜드를 위한 정밀 진단과 치료, 브랜드 성장 연구소 KS IDEA입니다.',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '봉은사로 306 NK타워 9층',
			addressLocality: 'Seoul',
			addressRegion: 'Gangnam-gu',
			postalCode: '06152',
			addressCountry: 'KR',
		},
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'ksidea@ksidea.co.kr',
			contactType: 'customer service',
		},
		sameAs: ['https://www.instagram.com/brand_clinic_ksidea/', 'https://www.youtube.com/@mr.good_b'],
	};

	return (
		<html lang="ko">
			<head>
				{/* Futura PT - Adobe Typekit */}
				<link rel="stylesheet" href="https://use.typekit.net/xsz5gdr.css" />
				{/* SUIT Variable - CDN */}
				<link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" rel="stylesheet" />
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			</head>
			<body>{children}</body>
		</html>
	);
}
