# GEO Audit Report: KS IDEA

**Audit Date:** 2026-03-16  
**URL:** https://ksidea.co.kr/  
**Business Type:** 에이전시/서비스 (브랜드 컨설팅, 로컬 오피스 보유)  
**Pages Analyzed:** 1

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

KS IDEA는 단일 랜딩 페이지 기준으로 메타데이터, Open Graph, 기본 Organization 스키마, 주소/이메일 등 기본 SEO 신호는 갖추고 있습니다. 다만 AI가 인용하기 좋은 답변형 콘텐츠, 서비스 설명 페이지, 사례 기반 증거, 외부 엔터티 신호가 매우 부족해 GEO 관점에서는 가시성이 약합니다. 특히 `llms.txt` 부재, 홈 1개만 포함된 사이트맵, FAQ UI 대비 FAQ 스키마/서버 렌더링 답변 부재가 가장 큰 개선 포인트입니다.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---:|---:|---:|
| AI Citability | 44/100 | 25% | 11.0 |
| Brand Authority | 40/100 | 20% | 8.0 |
| Content E-E-A-T | 48/100 | 20% | 9.6 |
| Technical GEO | 61/100 | 15% | 9.2 |
| Schema & Structured Data | 55/100 | 10% | 5.5 |
| Platform Optimization | 36/100 | 10% | 3.6 |
| **Overall GEO Score** |  |  | **47/100** |

---

## Critical Issues (Fix Immediately)

- 즉시 크롤링을 차단하는 치명적 이슈는 확인되지 않았습니다.
- `robots.txt`는 전체 허용이며 홈 페이지는 200 응답입니다.

## High Priority Issues

- `https://ksidea.co.kr/llms.txt` 가 2026-03-16 기준 404를 반환합니다. AI 시스템용 사이트 요약, 우선 읽을 페이지, 금지 영역을 명시할 수 없습니다.
- `https://ksidea.co.kr/sitemap.xml` 에 홈 URL 1개만 등록되어 있습니다. 서비스, 방법론, 사례, FAQ, 팀, 연락처 같은 인텐트별 랜딩이 없어 AI와 검색엔진이 사이트 의미 구조를 학습하기 어렵습니다.
- 홈 페이지 본문은 약 224단어 수준이며, 상당 부분이 클라이언트명 나열로 구성됩니다. “무엇을 어떻게 해결하는지”를 설명하는 독립 인용 가능 문단이 부족합니다.
- FAQ 섹션은 6개 질문 UI를 제공하지만, 답변 본문은 초기 DOM에 렌더되지 않고 `FAQPage` 스키마도 없습니다. AI 크롤러가 Q&A 자산으로 활용하기 어렵습니다.
- 외부 엔터티 신호가 약합니다. 공개 웹 검색 기준 LinkedIn, Reddit, Wikipedia, 미디어/리서치 인용 등 강한 제3자 언급을 즉시 확인하기 어려웠습니다. 이는 검색 결과 부재를 근거로 한 추론입니다.

## Medium Priority Issues

- 구조화 데이터가 `Organization` 1종에 머뭅니다. 현재 사이트 성격상 `ProfessionalService` 또는 `LocalBusiness`, `Service`, `WebSite`, `VideoObject` 확장이 적합합니다.
- 실제 주소와 이메일은 있으나 전화번호, 운영시간, 팀 소개, 담당자 실명/직함, 경력 같은 신뢰 신호가 없습니다.
- 클라이언트 로고/텍스트 목록은 강점이지만, 프로젝트 범위, 성과 지표, 업종별 결과, 기간 같은 검증 가능한 사례 데이터가 없습니다.
- 이미지 6개 중 2개가 빈 `alt` 값을 사용합니다. 현재는 장식 이미지 성격이지만, 핵심 시각 자산이라면 설명형 대체 텍스트가 더 유리합니다.
- 내부 링크가 사실상 홈 자기참조 2개 수준이라 크롤링 깊이와 주제 클러스터 형성이 어렵습니다.

## Low Priority Issues

- 소셜 `sameAs`가 Instagram, YouTube 2개에 한정됩니다. LinkedIn Company Page, Naver, press/interview profile 확장이 필요합니다.
- 비디오 섹션이 있으나 `VideoObject` 스키마와 영상 요약 텍스트가 없습니다.
- 클라이언트 목록이 시각적으로는 강하지만 카테고리, 산업군, 성과 기준으로 구조화되어 있지 않습니다.

---

## Category Deep Dives

### AI Citability (44/100)

- 장점:
  - H1 `The Brand Clinic` 과 핵심 메시지 6줄은 브랜드 포지셔닝을 짧게 전달합니다.
  - FAQ 섹션 자체는 “브랜드 진단” 프레이밍을 명확히 만듭니다.
- 한계:
  - 인용 가치가 높은 설명형 문단이 적습니다. 현재 카피는 선언적이지만 검색 질문에 대한 직접 답변 형식이 아닙니다.
  - 서비스 정의, 대상 고객, 진단 방식, 산출물, 예상 기간, 성과 지표가 문단 단위로 정리되어 있지 않습니다.
  - FAQ 답변은 사용자가 클릭해야만 렌더되어 초기 HTML에 없습니다.
- 권장:
  - 홈에 3~5개의 “질문-답변 블록”을 서버 렌더링으로 추가합니다.
  - “브랜드 성장이 멈추는 이유”, “브랜드 진단이 필요한 신호”, “KS IDEA가 제공하는 치료법” 같은 검색 의도형 소제목을 만듭니다.
  - 숫자, 범위, 프로세스 단계, 전후 변화처럼 AI가 그대로 인용하기 쉬운 문장을 늘립니다.

### Brand Authority (40/100)

- 장점:
  - 사이트에 실제 주소, 이메일, 클라이언트 목록, 소셜 링크가 존재합니다.
  - `Organization` 스키마의 `sameAs` 로 Instagram과 YouTube를 연결하고 있습니다.
- 한계:
  - 공개 웹에서 강한 제3자 엔터티 신호를 즉시 찾기 어렵습니다.
  - LinkedIn, Wikipedia, Reddit, 업계 기사, 인터뷰, 컨퍼런스 발표, 외부 리뷰 등 AI가 학습하거나 인용하기 쉬운 외부 신호가 약합니다.
- 권장:
  - 회사/대표 LinkedIn 정비, 보도자료/인터뷰 노출, 외부 기고, 파트너 페이지 인용을 늘립니다.
  - 클라이언트 사례를 외부 발표 자료, 미디어 기사, 영상 콘텐츠로 재배포합니다.

### Content E-E-A-T (48/100)

- 장점:
  - 오피스 주소, 이메일, 다수의 클라이언트 실적 표시는 기본 신뢰 신호입니다.
  - 브랜드 진단 관점의 메시지 일관성은 좋습니다.
- 한계:
  - 누가 진단하는지에 대한 사람 정보가 없습니다.
  - 경력, 방법론, 업종 전문성, 실제 성과 지표, 추천사, 저자/감수 표기가 없습니다.
  - 홈 한 페이지만으로는 경험과 전문성을 충분히 검증하기 어렵습니다.
- 권장:
  - 팀/리더 소개 페이지와 실명 기반 프로필을 추가합니다.
  - 사례 페이지에 문제, 원인, 개입, 결과를 정량 지표와 함께 공개합니다.
  - 방법론 문서 또는 인사이트 아티클을 만들어 전문성의 반복 신호를 축적합니다.

### Technical GEO (61/100)

- 확인 사항:
  - 홈 페이지: 200 OK
  - `robots.txt`: 전체 허용, `/private/` 차단, 사이트맵 명시
  - `sitemap.xml`: 존재, 단 1 URL만 등록
  - `llms.txt`: 404
  - 홈 메타: canonical, OG, Twitter, robots, googlebot 존재
- 장점:
  - AI 크롤러를 명시적으로 차단하는 규칙은 확인되지 않았습니다.
  - 렌더링 후 Lighthouse SEO는 양호하게 나옵니다.
- 한계:
  - AI 전용 힌트 파일 `llms.txt` 가 없습니다.
  - 크롤링 가능한 URL 집합이 지나치게 작아 의미 구조가 빈약합니다.
  - FAQ 답변, 사례 데이터 등 중요한 정보가 서버 HTML 기준으로 얕습니다.
- 권장:
  - `llms.txt` 추가
  - 사이트맵을 핵심 정보 구조에 맞춰 확장
  - 홈 외에 인덱싱 가능한 하위 정보 페이지 생성

### Schema & Structured Data (55/100)

- 현재 발견:
  - `Organization`
- 누락 가능성이 큰 항목:
  - `ProfessionalService` 또는 `LocalBusiness`
  - `Service`
  - `WebSite`
  - `FAQPage`
  - `VideoObject`
- 평가:
  - 기본 조직 정보는 깔끔하지만, 현재 콘텐츠 구조를 AI 친화적으로 설명하기에는 너무 얕습니다.

### Platform Optimization (36/100)

- 현재 확인:
  - Instagram
  - YouTube
- 미흡:
  - LinkedIn Company Page 신호 부재
  - Reddit/Wikipedia/언론/외부 디렉터리 흔적 부족
  - AI가 재인용하기 쉬운 long-form 플랫폼 자산 부족
- 권장:
  - YouTube에 브랜드 진단/사례/인사이트 형식의 설명형 영상 업로드
  - LinkedIn 회사 페이지 및 대표 프로필 정비
  - Naver/브런치/미디엄/업계 매체 등에 장문 설명형 콘텐츠 배포

---

## Quick Wins (Implement This Week)

1. `https://ksidea.co.kr/llms.txt` 를 만들고 사이트 설명, 핵심 페이지, 연락처, 금지 경로를 명시합니다.
2. 사이트맵을 홈 1개에서 서비스, 방법론, 사례, FAQ, 팀, 연락처 페이지까지 확장합니다.
3. 홈 FAQ를 클릭형 UI만 두지 말고, 답변 전문을 서버 렌더링 텍스트와 `FAQPage` 스키마로 함께 제공합니다.
4. `Organization` 외에 `ProfessionalService` 또는 `LocalBusiness`, `Service`, `VideoObject` 스키마를 추가합니다.
5. 홈에 “누구를 위해, 무엇을, 어떤 절차로, 어떤 결과를” 제공하는 4개 설명 블록을 추가합니다.

## 30-Day Action Plan

### Week 1: 기술 기반 정리
- [ ] `llms.txt` 추가
- [ ] 사이트맵 확장 및 Search Console/Bing Webmaster 제출

### Week 2: 인용 가능한 정보 구조 만들기
- [ ] 홈에 서비스 정의, 진단 프로세스, 대상 고객, 결과물 설명 섹션 추가
- [ ] FAQ 답변을 서버 렌더링하고 `FAQPage` 스키마 연결

### Week 3: E-E-A-T 강화
- [ ] 팀/리더 소개 페이지와 경력, 전문 분야, 연락 채널 공개
- [ ] 최소 2개의 사례 페이지를 문제-개입-성과 형식으로 작성

### Week 4: 플랫폼/브랜드 신호 확장
- [ ] LinkedIn 회사 페이지와 대표 프로필 구축 또는 정비
- [ ] YouTube/외부 매체용 장문 인사이트 콘텐츠 2개 이상 발행

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| https://ksidea.co.kr/ | KS IDEA \| The Brand Clinic | 9 |

## Appendix: Technical Endpoints Checked

| URL | Status | Notes |
|---|---:|---|
| https://ksidea.co.kr/robots.txt | 200 | 전체 허용, `/private/` 차단, 사이트맵 명시 |
| https://ksidea.co.kr/sitemap.xml | 200 | 홈 URL 1개만 포함 |
| https://ksidea.co.kr/llms.txt | 404 | AI 전용 힌트 파일 없음 |
