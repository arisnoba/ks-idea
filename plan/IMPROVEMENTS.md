# 프로젝트 개선안 및 불필요 요소 분석

## 1. 불필요한 파일 및 디렉토리 제거

### `src/data/` 디렉토리
- **현황:** 디렉토리는 존재하지만 내용이 비어 있습니다 (`ls` 결과 비어 있음).
- **개선:** 향후 데이터 파일(works, faq 등)이 들어올 예정이 아니라면 제거하거나, 필요한 경우 `.gitkeep` 또는 초기 데이터 파일을 추가하여 용도를 명확히 합니다.

## 2. 문서화 및 코드 일관성 개선

### `README.md` 프로젝트 구조 업데이트
- **현황:** `README.md`에 나열된 컴포넌트(`AboutSection`, `GCISection`, `WorkSection`, `ContactSection`)가 실제 `src/components`에 존재하지 않습니다.
- **개선:** 현재 존재하는 컴포넌트 목록(`HeroSection`, `ClientsSection`, `FAQSection`, `ManifestoSection`)에 맞게 `README.md`를 업데이트해야 합니다.

### `package.json` 버전 확인
- **현황:** `next: 16.1.6` 및 `react: 19.2.3`을 사용 중입니다.
- **개선:** 이는 매우 최신 버전(Canary/Beta급)이므로, 안정성이 중요한 프로젝트라면 `LTS` 버전으로의 고정이 필요할 수 있습니다. 하지만 최신 기능을 의도적으로 사용하는 것이라면 유지합니다.

## 3. 기능적 최적화 제안

### `useGsapSnap` 로직 단순화 검토
- **현황:** 현재 `page.tsx`에서 `snapSections`로 `HeroSection` 하나만 전달하고 있습니다. 하지만 `useGsapSnap`은 여러 섹션 간의 스냅 전환 로직(패널 이동, z-index 관리 등)이 상당히 복잡하게 구현되어 있습니다.
- **개선:** 만약 향후에도 스냅 섹션이 `Hero` 하나뿐이라면, `useGsapSnap`을 훨씬 단순한 형태(단순 ScrollTrigger 핀 고정 및 해제)로 리팩토링하여 유지보수성을 높일 수 있습니다.

### `SnapScrollLayout`의 반응형 대응
- **현황:** 모바일에서 `useGsapSnap`이 터치 이벤트를 `preventDefault`로 가로채고 있는데, 이는 브라우저의 기본 스크롤 경험을 해칠 수 있습니다.
- **개선:** 모바일 환경(터치 디바이스)에서는 스냅 기능을 비활성화하고 네이티브 스크롤을 허용하거나, `ScrollTrigger.normalizeScroll()` 같은 대안을 검토하여 네이티브 경험을 개선할 수 있습니다.

## 4. 정적 자원 관리

### 이미지 및 비디오 최적화
- **현황:** `public/images` 및 `public/video`에 고용량 자원이 포함되어 있습니다.
- **개선:** `next/image`를 사용하지 못하는 정적 배포(`output: export`) 환경이므로, 배포 전 이미지를 WebP/Avif 형식으로 수동 최적화하고 비디오는 스트리밍에 적합하게 인코딩하는 과정이 권장됩니다.
