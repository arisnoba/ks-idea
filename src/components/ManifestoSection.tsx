'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ManifestoSection.module.scss';

interface VideoPlayerProps {
	src: string;
	poster: string;
	className?: string;
}

function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLInputElement>(null);
	const isInViewportRef = useRef(false);
	const isUserPausedRef = useRef(false);
	const [isMuted, setIsMuted] = useState(true);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [showPosterOverlay, setShowPosterOverlay] = useState(true);

	const playVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		video.play().catch(() => {});
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedData = () => {
			setIsReady(true);
		};

		const handlePlaying = () => {
			setIsPlaying(true);
			setShowPosterOverlay(false);
		};

		const handlePause = () => {
			setIsPlaying(false);
		};

		video.addEventListener('loadeddata', handleLoadedData);
		video.addEventListener('playing', handlePlaying);
		video.addEventListener('pause', handlePause);

		video.preload = 'auto';
		video.load();

		const readyStateSyncId = window.requestAnimationFrame(() => {
			if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
				handleLoadedData();
			}
		});

		return () => {
			window.cancelAnimationFrame(readyStateSyncId);
			video.removeEventListener('loadeddata', handleLoadedData);
			video.removeEventListener('playing', handlePlaying);
			video.removeEventListener('pause', handlePause);
		};
	}, []);

	// Viewport autoplay / pause via IntersectionObserver
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isInViewportRef.current = entry.isIntersecting;

					if (entry.isIntersecting) {
						if (!isReady) {
							video.load();
						}

						if (!isUserPausedRef.current && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
							playVideo();
						}
						return;
					}

					video.pause();
				});
			},
			{ threshold: 0.4 }
		);

		observer.observe(video);
		return () => observer.disconnect();
	}, [isReady, playVideo]);

	useEffect(() => {
		if (!isReady || !isInViewportRef.current || isUserPausedRef.current) {
			return;
		}

		playVideo();
	}, [isReady, playVideo]);

	// Update progress bar while playing
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onTimeUpdate = () => {
			if (!isDragging && video.duration) {
				setProgress((video.currentTime / video.duration) * 100);
			}
		};

		video.addEventListener('timeupdate', onTimeUpdate);
		return () => video.removeEventListener('timeupdate', onTimeUpdate);
	}, [isDragging]);

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			isUserPausedRef.current = false;
			playVideo();
			return;
		}

		video.pause();
		isUserPausedRef.current = true;
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;
		video.muted = !video.muted;
		setIsMuted(video.muted);
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current;
		if (!video || !video.duration) return;
		const value = Number(e.target.value);
		setProgress(value);
		video.currentTime = (value / 100) * video.duration;
	};

	const handleFullscreen = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;

		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			container.requestFullscreen();
		}
	}, []);

	return (
		<div
			ref={containerRef}
			className={`${styles.videoContainer} ${className ?? ''}`}
			onClick={togglePlay}
		>
			<div
				className={`${styles.posterOverlay} ${showPosterOverlay ? '' : styles.posterOverlayHidden}`}
				aria-hidden='true'
			>
				<Image
					src={poster}
					alt=''
					fill
					className={styles.posterImage}
					sizes='100vw'
					unoptimized
				/>
			</div>

			<video
				ref={videoRef}
				src={src}
				preload='auto'
				muted
				loop
				playsInline
				className={styles.video}
			/>

			{/* Custom controls */}
			<div className={styles.controls} onClick={(e) => e.stopPropagation()}>
				{/* Timeline */}
				<div className={styles.progressWrapper}>
					<input
						ref={progressRef}
						type='range'
						min={0}
						max={100}
						step={0.1}
						value={progress}
						onChange={handleProgressChange}
						onMouseDown={() => setIsDragging(true)}
						onMouseUp={() => setIsDragging(false)}
						onTouchStart={() => setIsDragging(true)}
						onTouchEnd={() => setIsDragging(false)}
						className={styles.progressBar}
						style={{ '--progress': `${progress}%` } as React.CSSProperties}
					/>
				</div>

				{/* Buttons */}
				<div className={styles.buttons}>
					{/* Play / Stop */}
					<button
						type='button'
						className={styles.controlBtn}
						onClick={togglePlay}
						aria-label={isPlaying ? '일시정지' : '재생'}
					>
						{isPlaying ? (
							// Pause icon
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<rect x='6' y='4' width='4' height='16' rx='1' />
								<rect x='14' y='4' width='4' height='16' rx='1' />
							</svg>
						) : (
							// Play icon
							<svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
								<polygon points='5 3 19 12 5 21 5 3' />
							</svg>
						)}
					</button>
					{/* Spacer */}
					<div style={{ flex: 1 }} />
					{/* Right controls */}
					{/* Mute toggle */}
					<button
						type='button'
						className={styles.controlBtn}
						onClick={toggleMute}
						aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
					>
						{isMuted ? (
							// Muted icon
							<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
								<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
								<line x1='23' y1='9' x2='17' y2='15' />
								<line x1='17' y1='9' x2='23' y2='15' />
							</svg>
						) : (
							// Speaker icon
							<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
								<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
								<path d='M15.54 8.46a5 5 0 0 1 0 7.07' />
								<path d='M19.07 4.93a10 10 0 0 1 0 14.14' />
							</svg>
						)}
					</button>

					{/* Fullscreen */}
					<button
						type='button'
						className={styles.controlBtn}
						onClick={handleFullscreen}
						aria-label='전체화면'
					>
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
							<path d='M8 3H5a2 2 0 0 0-2 2v3' />
							<path d='M21 8V5a2 2 0 0 0-2-2h-3' />
							<path d='M3 16v3a2 2 0 0 0 2 2h3' />
							<path d='M16 21h3a2 2 0 0 0 2-2v-3' />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default function ManifestoSection() {
	return (
		<section className={`section-manifesto ${styles.manifesto}`} id='work'>
			<div className='container'>
				{/* SEO 보조 텍스트 - 시각적으로는 숨김 */}
				<div className='sr-only'>
					<h2>KS IDEA Manifesto - Brand Clinic</h2>
					<p>성장이 멈춘 브랜드를 위해 KS IDEA가 제안하는 해결책입니다. 우리는 증상이 아니라 원인을 진단하며, 브랜드가 한계를 넘어 다시 성장할 수 있도록 치료합니다.</p>
				</div>

				<div className={styles.videoWrapper}>
					{/* Desktop 16:9 */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.7 }}
					>
						<VideoPlayer
							src='/assets/video/manifesto_1920_optim.mp4'
							poster='/assets/images/manifesto_1920_optim.webp'
							className={styles.desktop}
						/>
					</motion.div>
					{/* Mobile 9:16 */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.7 }}
					>
						<VideoPlayer
							src='/assets/video/manifesto_1080_optim.mp4'
							poster='/assets/images/manifesto_1080_optim.webp'
							className={styles.mobile}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
