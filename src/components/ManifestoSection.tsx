"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./ManifestoSection.module.scss";

interface VideoPlayerProps {
  src: string;
  poster: string;
  className?: string;
}

function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isUserPausedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Viewport autoplay / pause via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isUserPausedRef.current) {
              video.play().catch(() => {});
              setIsPlaying(true);
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Update progress bar while playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!isDragging && video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [isDragging]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      isUserPausedRef.current = false;
    } else {
      video.pause();
      setIsPlaying(false);
      isUserPausedRef.current = true;
    }
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
      className={`${styles.videoContainer} ${className ?? ""}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
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
            type="range"
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
            style={{ "--progress": `${progress}%` } as React.CSSProperties}
          />
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          {/* Play / Stop */}
          <button
            type="button"
            className={styles.controlBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? (
              // Pause icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          {/* Spacer */}
          <div style={{ flex: 1 }} />
          {/* Right controls */}
          {/* Mute toggle */}
          <button
            type="button"
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
          >
            {isMuted ? (
              // Muted icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              // Speaker icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            className={styles.controlBtn}
            onClick={handleFullscreen}
            aria-label="전체화면"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManifestoSection() {
  return (
    <section className={`section-manifesto ${styles.manifesto}`} id="work">
      <div className="container">
        <div className={styles.videoWrapper}>
          {/* Desktop 16:9 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <VideoPlayer
              src="/video/manifesto_1920_optim.mp4"
              poster="/images/manifesto_1920_optim.webp"
              className={styles.desktop}
            />
          </motion.div>
          {/* Mobile 9:16 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <VideoPlayer
              src="/video/manifesto_1080_optim.mp4"
              poster="/images/manifesto_1080_optim.webp"
              className={styles.mobile}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
