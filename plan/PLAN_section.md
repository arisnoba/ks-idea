# GSAP ScrollTrigger 기반 스냅 스크롤 전환

## 배경

현재 스냅 스크롤이 `overflow: hidden` + JS `translateY` + 터치/휠 이벤트 가로채기로 구현되어 있어 모바일에서 심각한 문제 발생:

1. **Pull-to-refresh 충돌** — free-scroll 모드에서 `scrollY=0`일 때 아래로 당기면 브라우저 pull-to-refresh와 snap 복귀가 경쟁
2. **ClientsSection 잘림** — 53개 클라이언트가 모바일에서 `height: 100vh` + `overflow: hidden`에 의해 잘림
3. **네이티브 스크롤 완전 차단** — 터치 이벤트 preventDefault로 인한 다양한 부작용

GSAP ScrollTrigger로 전환하여 **네이티브 스크롤 기반**으로 snap 효과를 구현하면 위 문제 모두 해결.

## 변경 파일 목록

| 파일                                          | 변경                                     |
| --------------------------------------------- | ---------------------------------------- |
| `package.json`                                | gsap 추가 (Lenis 유지)                   |
| `src/hooks/useSnapScroll.ts`                  | **삭제**                                 |
| `src/hooks/useGsapSnap.ts`                    | **신규** — ScrollTrigger pin + snap 훅   |
| `src/components/SnapScrollLayout.tsx`         | viewport/track 래퍼 제거 → 평탄 DOM 구조 |
| `src/components/SnapScrollLayout.module.scss` | 간소화 (overflow:hidden 등 제거)         |
| `src/components/ClientsSection.module.scss`   | `height: 100vh` → `min-height: 100vh`    |
| `src/app/globals.css`                         | `overscroll-behavior: none` 추가         |

`page.tsx`, `HeroSection`, `FAQSection` 등 기존 컴포넌트 내부는 수정 없음.

## 구현 단계

### 1. 의존성 변경

```bash
npm install gsap
```

Lenis는 유지 — free-scroll 구간(FAQ/Manifesto/Footer)의 smooth scroll에 계속 사용.

### 2. `src/app/globals.css` — overscroll-behavior 추가

```css
html {
	overscroll-behavior: none; /* 모바일 pull-to-refresh 차단 */
	/* 기존 속성 유지 */
}
```

### 3. `src/components/ClientsSection.module.scss` — 모바일 잘림 수정

```scss
.clients {
	min-height: 100vh; /* height → min-height */
	/* 나머지 유지 */
}
```

### 4. `src/hooks/useGsapSnap.ts` — 신규 생성

- GSAP ScrollTrigger의 `pin` 기능으로 각 snap 섹션(Hero, Clients)을 화면에 고정
- `snap` 설정으로 섹션 단위 스냅 포인트 적용
- free-scroll 구간(FAQ 이후)에서는 snap 미적용
- Lenis를 free-scroll 구간에서 활성화 (snap 구간에서는 ScrollTrigger가 제어)
- ref 배열을 반환하여 SnapScrollLayout에서 각 섹션에 연결

### 5. `src/components/SnapScrollLayout.tsx` — 재작성

- `snapViewport` > `snapTrack` > `snapSlide` 중첩 구조 제거
- 모든 섹션을 평탄하게 나열, 각 snap 섹션에 ref 연결
- `useGsapSnap` 훅 사용 (기존 `useSnapScroll` 대체)

### 6. `src/components/SnapScrollLayout.module.scss` — 간소화

- `.snapViewport` (overflow:hidden), `.snapTrack` (translateY transition), `.snapSlide` (overflow:hidden) 모두 제거
- snap 섹션 래퍼에 필요한 최소 스타일만 유지

### 7. `src/hooks/useSnapScroll.ts` — 삭제

빌드/린트 통과 확인 후 삭제

## 주의사항

- Header는 `position: fixed; z-index: 100` — ScrollTrigger pin 시 z-index 충돌 없도록 snap 섹션의 z-index를 Header보다 낮게 유지
- HeroSection의 `.visual`에 `min-height: 100vh`가 있어 콘텐츠 높이가 100vh를 초과할 수 있음 — pin의 `end` 설정 시 고려
- 기존 Framer Motion 애니메이션(ClientsSection의 motion.div, FAQ의 AnimatePresence)은 네이티브 스크롤 기반이므로 ScrollTrigger와 자연 공존
- Lenis와 ScrollTrigger 병용 시 Lenis의 `wrapper`/`content` 옵션으로 free-scroll 구간만 제어하도록 설정 필요

## 검증

1. `npm run lint && npm run build` — 오류 없음
2. 데스크톱: Hero → Clients snap 동작, Clients 이후 FAQ/Manifesto/Footer 자유 스크롤
3. 모바일 (Chrome DevTools 에뮬레이션):
   - snap 섹션 스크롤 동작
   - pull-to-refresh 차단 확인
   - ClientsSection 내용 잘림 없음
   - FAQ 아코디언 정상 동작
   - 위로 스크롤 시 snap 섹션 자연스럽게 복귀
