'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQSection.module.scss';

interface FAQItem {
	title: string;
	subtitle: string;
	items: string[];
}

const faqData: FAQItem[] = [
	{
		title: 'Self-Diagnosis',
		subtitle: '당신의 브랜드는 어떤 상태인가요',
		items: ['1) 1차 성장 목표에 도달하지 못했나요', '2) 초기 성장 후 정체를 겪고 있나요', '3) 성장의 속도가 느려졌나요', '4) 성장은 하고 있지만 존재감이 약해지고 있나요'],
	},
	{
		title: 'Symptom Vs. Cause',
		subtitle: '증상이 아니라 원인을 진단해야 합니다',
		items: [
			'1) 고객이 우리를 모르는 것일까요, 매력이 없는 것일까요',
			'2) 신규 고객 유입이 문제인가요, 기존 고객 이탈이 문제인가요',
			'3) 마케팅 효율이 떨어지는 건 매체 문제인가요, 메시지 문제인가요',
		],
	},
	{
		title: 'Blind Spot',
		subtitle: '광고와 디자인만으로 문제를 덮을 수 없습니다',
		items: [
			'1) 최근 만든 광고는 내부의 갈등을 해소하기 위한 결과물은 아니었습니까',
			'2) 지난 1년간 집행한 활동 중 브랜드 자산으로 남은 것은 몇%입니까',
			'3) 리브랜딩을 고민한다면, 옷을 바꾸고 싶은 것입니까, 체질을 바꾸고 싶은 것입니까',
		],
	},
	{
		title: 'Identity Gap',
		subtitle: '브랜드의 핵심가치는 여전히 존재합니까',
		items: [
			'1) 초기 성장을 이끌었던 결정적 이유는 아직 유효합니까',
			'2) 팬들의 리뷰에서 가장 많이 등장하는 단어 3개를 답할 수 있습니까',
			'3) 고객이 당신의 브랜드를 선택해야 하는 단 하나의 이유는 무엇입니까',
		],
	},
	{
		title: 'The Plateau',
		subtitle: '성장이 멈춘 것이 아니라 막힌 것입니다',
		items: [
			'1) 현재 가장 큰 경쟁자는 다른 브랜드입니까, 고객의 무관심입니까',
			'2) 팀원들과 대표가 브랜드의 문제를 같은 단어로 정의하고 있습니까',
			'3) 지금 마케팅 예산이 0원이라면 당신의 브랜드의 생존기간은 얼마입니까',
		],
	},
	{
		title: 'Brand Clinic',
		subtitle: '정확한 원인을 찾으면 성장을 위한 치료가 가능합니다',
		items: [
			'1) 성장을 위해 바꿔야 할 것은 제품, 메시지, 타겟 중 어느 것입니까',
			'2) 단기처방을 원합니까, 근본적인 치료를 원합니까',
			'3) 브랜드를 다시 성장시키기 위해 무엇을 내려놓을 준비가 되어 있습니까',
		],
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className={`section-faq ${styles.faq}`}>
			<div className="container">
				<motion.h2
					className={`heading-xl ${styles.heading}`}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.7 }}>
					6 Questions<sup>*</sup>
				</motion.h2>
				<motion.div
					className={styles.list}
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}>
					{faqData.map((item, index) => (
						<div key={index} className={`${styles.item} ${openIndex === index ? styles.active : ''}`}>
							<div className={styles.header}>
								<button className={styles.question} onClick={() => toggle(index)} type="button">
									<span className={`heading-lg ${styles.title}`}>
										Q{index + 1}. {item.title}
									</span>
									<div className={styles.indicator}>
										{index === 0 && <span className={styles.guide}>(내려보기)</span>}
										<motion.div className={styles.arrow} initial={false} animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
											<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M7 12L0.0717968 0L13.9282 0L7 12Z" fill="currentColor" />
											</svg>
										</motion.div>
									</div>
								</button>
								<p className={`body-sm ${styles.subtitle}`}>{item.subtitle}</p>
							</div>
							<AnimatePresence initial={false}>
								{openIndex === index && (
									<motion.div
										className={styles.answer}
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}>
										<ul className={styles.itemList}>
											{item.items.map((line, i) => {
												const firstSpaceIndex = line.indexOf(' ');
												const number = line.substring(0, firstSpaceIndex);
												const content = line.substring(firstSpaceIndex + 1);
												return (
													<li key={i}>
														<span className={styles.itemNumber}>{number}</span>
														<span className={styles.itemText}>{content}</span>
													</li>
												);
											})}
										</ul>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</motion.div>

				<div className={styles.footer}>
					<motion.p
						className={`body-base ${styles.footerMain}`}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.3, delay: 0.5 }}>
						지금, KS IDEA를 만나 상의하세요
					</motion.p>
					<motion.p
						className={`caption ${styles.footerSub}`}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.3, delay: 0.7 }}>
						<span>*</span>
						<span>6 Questions는 Brand Clinic를 위한 사전 분석 툴로서 그 저작권은 KS IDEA에 있습니다</span>
					</motion.p>
				</div>
			</div>
		</section>
	);
}
