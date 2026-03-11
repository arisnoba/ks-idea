"use client";

import { motion } from "framer-motion";
import styles from "./ClientsSection.module.scss";

const clients = [
  "호카", "써코니", "세라젬", "피크", "배룩스", "쥬비스다이어트", "아이파크",
  "NH투자증권", "셀로", "iM뱅크", "컬럼비아스포츠웨어", "마인드마크",
  "기흥인터내셔널", "쟈뎅", "올프레쉬", "프로스펙스", "LG유플러스",
  "현대백화점", "웅진식품", "설해원", "하나자산", "전북은행", "굿지앤",
  "WMF", "놀부", "캐롤아시아", "메디톡스", "파파이스", "KT", "시원스쿨",
  "JTBC", "BHC", "AUDI", "파라다이스그룹", "몽벨", "잭울프스킨", "마임",
  "보건복지부", "Mnet", "해태음료", "웅진홀딩스", "웅진씽크북", "JP모간",
  "뉴욕생명", "진에어", "한국타이어", "G마켓", "영창악기", "CJ", "바디샾",
  "현대산업개발", "한국투자증권", "푸르덴셜생명", "넥슨", "보령제약",
  "한국씨티은행",
];

export default function ClientsSection() {
  return (
    <section className={`section-clients ${styles.clients}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className={`heading-xl ${styles.heading}`}>Clients</h2>
          <div className={styles.list}>
            {clients.map((name, i) => (
              <span key={name} className={styles.client}>
                {name}{i < clients.length - 1 ? " " : ""}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
