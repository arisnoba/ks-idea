# GEMINI.md - KS IDEA 프로젝트 컨텍스트

## 프로젝트 개요
**KS IDEA** 브랜드 성장 연구소 웹사이트 리뉴얼 프로젝트입니다. Next.js (App Router)를 기반으로 하며, 고품질 애니메이션과 독특한 스냅 스크롤 경험을 제공하는 싱글 페이지 애플리케이션입니다.

### 주요 기술 스택
- **프레임워크:** Next.js (App Router, Static Export)
- **스타일링:** Tailwind CSS v4 + SCSS (`clamp`를 활용한 반응형 타이포그래피)
- **애니메이션:** GSAP (ScrollTrigger, Observer) & Framer Motion
- **부드러운 스크롤:** Lenis
- **배포:** 정적 빌드 (`out/` 디렉토리)

### 아키텍처
`SnapScrollLayout`을 통해 전체 화면 스냅 스크롤 섹션(Hero)과 일반 수직 스크롤 섹션(Clients, FAQ, Manifesto, Footer) 사이의 전환을 관리합니다.

- **스냅 섹션 (Snap Section):** `useGsapSnap` 훅을 통해 관리되며, GSAP의 `ScrollTrigger.observe`를 사용하여 스크롤/터치 이벤트를 캡처하고 패널을 애니메이션화합니다.
- **일반 섹션 (Free Section):** 스냅 섹션 이후에 위치하며, 일반적인 수직 스크롤이 가능합니다.

## 빌드 및 실행
- **개발 모드:** `npm run dev`
- **프로덕션 빌드:** `npm run build` (결과물은 `out/`에 정적 export됨)
- **린트 체크:** `npm run lint`

## 개발 규약
- **컴포넌트:** TypeScript 기반 함수형 컴포넌트.
- **스타일링:** 컴포넌트별 스타일은 SCSS 모듈(`*.module.scss`)을 선호합니다. 글로벌 변수와 믹스인은 `src/styles/scss/`에 정의되어 있습니다.
- **명명 규칙:** 컴포넌트는 PascalCase, 훅과 유틸리티는 camelCase.
- **반응형 디자인:** 모바일 퍼스트 접근 방식을 사용하며, `clamp()`를 사용하여 375px에서 1280px+ 사이에서 유동적으로 크기가 조절되도록 합니다.
- **커밋 메시지:** 한국어로 작성하며 Conventional Commits 형식을 따릅니다.

## 주요 파일
- `src/app/page.tsx`: 스냅 및 일반 섹션을 정의하는 엔트리 포인트.
- `src/hooks/useGsapSnap.ts`: 스냅 스크롤 메커니즘의 핵심 로직.
- `src/components/SnapScrollLayout.tsx`: 스크롤 동작을 조율하는 레이아웃 래퍼.
- `src/styles/scss/_variables.scss`: 색상, 간격, 타이포그래피 관련 글로벌 SCSS 변수.

## 향후 상호작용 지침
스크롤 동작 수정 시 `src/hooks/useGsapSnap.ts`를 참조하십시오. 섹션 높이 변경 시 `ScrollTrigger`가 리프레시되도록 주의해야 합니다. UI 변경 시 `README.md`에 정의된 타이포그래피 토큰을 준수하십시오.