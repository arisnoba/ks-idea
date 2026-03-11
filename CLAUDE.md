# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server
npm run build    # static export → out/
npm run lint     # ESLint (next/core-web-vitals + TypeScript rules)
npm start        # serve production build locally
```

No automated test suite exists. Before any PR: run `npm run lint && npm run build`, then manually verify the main page, FAQ accordion, scroll animations, and static assets at both desktop and mobile widths.

## Architecture

This is a **single-page static site** built with Next.js App Router (`output: 'export'`). The entire page lives in `src/app/page.tsx`, which composes section components in order:

```
Header → HeroSection → ClientsSection → FAQSection → ManifestoSection → Footer
```

**Key architectural facts:**
- `next.config.ts` has `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true` — required for flat-file web hosting deployment via the generated `out/` directory.
- Each component in `src/components/` is paired with a same-named SCSS module (`PascalCase.tsx` + `PascalCase.module.scss`).
- Shared Sass design tokens live in `src/styles/scss/`: `_variables.scss` (type scale + container widths), `_mixins.scss`, `_typography.scss`.
- Global Tailwind v4 theme tokens are defined in `src/app/globals.css`.
- Fonts load via CDN in `src/app/layout.tsx`: **Futura PT** (Typekit) for English, **SUIT Variable** (jsdelivr) for Korean.
- Animations use **Framer Motion** (`AnimatePresence` for FAQ accordion, scroll-triggered fade/slide for sections).

## Styling Conventions

- Mobile-first responsive design; layout uses 20px horizontal padding, 1280px max container (1320px total with padding).
- Typography uses `clamp()` for fluid scaling — always reference the `$font-*` tokens from `_variables.scss` rather than hardcoding sizes.
- Use Tailwind utility classes for one-off spacing/layout; use SCSS modules for component-specific styles; use `_variables.scss` for shared design tokens.
- Indentation: **tabs**. Strings: **single quotes** in TSX/TS files.

## Deployment

Build output goes to `out/` and is uploaded directly to web hosting. Do not commit the `out/` directory — treat it as a deployment artifact only.
