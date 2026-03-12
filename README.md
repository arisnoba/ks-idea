# KS IDEA — 웹사이트 리뉴얼 PRD

## 개요

KS IDEA 브랜드 성장 연구소 웹사이트 리뉴얼.  
기존 다중 페이지(HTML/CSS/JS)를 **싱글 페이지** 구조로 전환하고, 모던 기술 스택으로 재구성한다.

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js (App Router, `output: 'export'`) |
| 언어 | TypeScript |
| CSS | Tailwind CSS v4 (`@theme`) + SCSS (`clamp`) |
| 애니메이션 | Framer Motion + GSAP + Lenis |
| 폰트 | Futura PT (Typekit) + SUIT Variable (CDN) |
| 배포 | 정적 빌드(`out/`) → 웹호스팅 직접 업로드 |

---

## 레이아웃

- **좌우 여백**: 20px
- **최대 컨테이너 너비**: 1280px (패딩 포함 1320px)
- **반응형**: 모바일 퍼스트

---

## 타이포그래피

### 폰트

| 용도 | 폰트 | 로드 |
|------|------|------|
| 영문 | Futura PT | `<link rel="stylesheet" href="https://use.typekit.net/xsz5gdr.css" />` |
| 국문 | SUIT Variable | `<link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" rel="stylesheet">` |

### 사이즈 (mobile → desktop, clamp 적용)

| 토큰 | mobile (min) | desktop (max) |
|------|-------------|---------------|
| `$font-heading-xl` | 27px | 37px |
| `$font-heading-lg` | 24px | 34px |
| `$font-body-base` | 14px | 19px |
| `$font-body-sm` | 12px | 19px |
| `$font-caption` | 11px | 16px |

---

## 페이지 섹션 구성

| # | 섹션 | className | 설명 |
|---|------|-----------|------|
| 1 | Header | `header` | 로고 + 네비게이션 (앵커 링크) |
| 2 | Hero | `section-hero` | 메인 비주얼, 슬로건 (스냅 섹션) |
| 3 | Clients | `section-clients` | 클라이언트 목록 |
| 4 | FAQ | `section-faq` | 아코디언 방식 Q&A (6개) |
| 5 | Manifesto | `section-manifesto` | 브랜드 철학 및 영상 |
| 6 | Footer | `footer` | Contact 정보 |

> 각 섹션 컴포넌트에 **고유 className** 필수 부여

---

## 주요 기능

### FAQ 아코디언
- 질문 클릭 시 답변 영역 토글 (Framer Motion `AnimatePresence`)
- 하나만 열리거나 복수 열림 옵션

### 스냅 스크롤 (Snap Scroll)
- Hero 섹션은 GSAP ScrollTrigger Observer를 이용한 전체 화면 스냅 적용 (`useGsapSnap.ts`)
- 스냅 구간 외에는 Lenis 부드러운 스크롤 활성화 (`useLenis.ts`)
- 스크롤 위치에 따라 Header 패딩이 GSAP으로 동적 전환

### 정적 배포
- `next build` → `out/` 디렉토리 생성
- `next.config.ts`에서 `output: 'export'`, `images: { unoptimized: true }`
- `trailingSlash: true` (웹호스팅 호환)

---

## 프로젝트 구조

```
ks-idea/
├── public/
│   ├── images/
│   └── video/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ClientsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── ManifestoSection.tsx
│   │   ├── Footer.tsx
│   │   └── SnapScrollLayout.tsx
│   ├── hooks/
│   │   ├── useGsapSnap.ts
│   │   └── useLenis.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── scss/
│   │       ├── _variables.scss
│   │       ├── _mixins.scss
│   │       └── _typography.scss
├── next.config.ts
├── tsconfig.json
└── package.json
```
