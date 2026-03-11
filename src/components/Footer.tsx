"use client";

import { motion } from "framer-motion";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={`footer ${styles.footer}`} id="contact">
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* SNS Links */}
          <div className={styles.sns}>
            <a
              href="https://www.instagram.com/ksidea.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.snsLink}
              aria-label="Instagram"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span className={styles.snsLabel}>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@ksideacokr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.snsLink}
              aria-label="YouTube"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
              </svg>
              <span className={styles.snsLabel}>YouTube</span>
            </a>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h3 className={styles.contactHeading}>Contact</h3>
            <a href="mailto:ksidea@ksidea.co.kr" className={styles.contactLink}>
              ksidea@ksidea.co.kr
            </a>
            <a
              href="https://naver.me/xucjMxP9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              강남구 봉은사로 306 NK타워 9층
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
