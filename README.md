# CurvioValet Marketing Site

Public SaaS landing for [CurvioValet.com](https://curviovalet.com) — built with **Expo (web)** + **NativeWind** to match the product stack (React Native client + TypeScript REST API).

The operational app lives in `C:\Users\growd\Desktop\ValeParking-app`.

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

## Links

- **App:** [curviovalet.online](https://curviovalet.online)
- **API:** [api.curviovalet.online](https://api.curviovalet.online)
- **Product repo:** [ValeParking-App](https://github.com/Doki39/ValeParking-App)
