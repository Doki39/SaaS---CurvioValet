# CurvioValet Marketing Site

Public marketing site for [CurvioValet.com](https://curviovalet.com) — **Expo (web)** + **NativeWind**.

## Quick start

```bash
npm install
npm run web
```

Static export for hosting:

```bash
npx expo export --platform web
```

Output is in `dist/`.

## Structure

| Path | Role |
|------|------|
| `app/` | Expo Router entry |
| `components/landing/` | Landing page sections |
| `constants/landingContent.ts` | Copy, pricing, FAQ (edit here first) |
| `assets/hero.jpg` | Hero image (web + native) |
| `global.css` | Tailwind + shimmer utilities |
