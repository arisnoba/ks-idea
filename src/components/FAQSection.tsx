"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Self-Diagnosis",
    answer:
      "브랜드 현 상태를 분석합니다. 시장 내 위치, 브랜드 인지도, 경쟁 브랜드 대비 강약점, 소비자 인식 등을 종합적으로 진단하여 성장의 출발점을 설정합니다.",
  },
  {
    question: "Symptom vs. Cause",
    answer:
      "겉으로 드러나는 증상이 아니라, 그 증상을 일으키는 근본적인 원인을 찾습니다. 브랜드가 겪고 있는 문제의 본질을 정확하게 파악하는 것이 올바른 처방의 시작입니다.",
  },
  {
    question: "Blind Spot",
    answer:
      "브랜드 스스로가 보지 못하는 사각지대를 발견합니다. 내부에서는 당연하게 여기는 것들이 외부에서는 전혀 다르게 인식될 수 있습니다.",
  },
  {
    question: "Identity Gap",
    answer:
      "브랜드가 전달하고자 하는 아이덴티티와 소비자가 실제로 인식하는 이미지 사이의 간극을 분석합니다.",
  },
  {
    question: "The Fitness",
    answer:
      "브랜드 성장을 위한 전략과 실행 방안이 브랜드의 본질과 시장 상황에 적합한지를 점검합니다.",
  },
  {
    question: "Brand Clinic",
    answer:
      "진단 결과를 바탕으로 브랜드 도약을 위한 맞춤형 성장 프로그램을 설계하고 실행합니다.",
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={`heading-xl ${styles.heading}`}>6 Questions</h2>
          <div className={styles.list}>
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`${styles.item} ${openIndex === index ? styles.active : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggle(index)}
                  type="button"
                >
                  <span className={styles.number}>
                    Q{index + 1}.
                  </span>
                  <span className={styles.text}>{item.question}</span>
                  <span className={styles.arrow}>
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
