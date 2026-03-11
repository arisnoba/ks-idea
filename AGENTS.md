# Repository Guidelines

## Project Structure & Module Organization
This repository is a static-exported Next.js 16 site. App entry points live in `src/app/`, with the home page assembled in `src/app/page.tsx` and shared layout in `src/app/layout.tsx`. Reusable UI sections live in `src/components/` and follow `PascalCase.tsx` + `PascalCase.module.scss` pairing. Shared design tokens and Sass helpers live in `src/styles/scss/`, while global Tailwind v4 theme tokens are defined in `src/app/globals.css`. Static assets belong in `public/` (`public/images/`, `public/video/`). Build output is generated into `out/` and should not be edited manually.

## Build, Test, and Development Commands
- `npm install`: install project dependencies.
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create the production static export in `out/`.
- `npm start`: run the production server build locally.
- `npm run lint`: run ESLint with the Next.js core-web-vitals and TypeScript rules.

## Coding Style & Naming Conventions
Use TypeScript function components and keep component files in `PascalCase`. Match each component with a same-named SCSS module when styling is component-specific. The current codebase uses tabs for indentation and single quotes in TSX/TS files; preserve that style. Prefer descriptive section class names such as `section-hero` or `section-faq`, and keep shared spacing, typography, and color values in the existing theme or Sass token files instead of hardcoding duplicates.

## Testing Guidelines
There is no automated test suite in the repository yet. Before opening a PR, run `npm run lint` and `npm run build`, then manually verify the main page, FAQ interactions, scroll behavior, and static assets in desktop and mobile layouts. When tests are introduced later, place them next to the feature or under a dedicated `tests/` directory and name them after the feature they cover.

## Commit & Pull Request Guidelines
Recent history favors short, focused commit messages, often with conventional prefixes such as `feat:` and `style:`; some older commits are written in Korean. Keep each commit scoped to one logical change and write the message in a single language. PRs should include a concise summary, linked issue or task reference when available, and before/after screenshots or screen recordings for UI changes.

## Deployment Notes
`next.config.ts` is configured for static hosting with `output: 'export'`, `images.unoptimized`, and `trailingSlash: true`. Treat `out/` as generated output for deployment artifacts only.
