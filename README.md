# Runbridge.ai Frontend Prototypes

A blue-themed Runbridge.ai prototype containing two independent frontend projects in one repository: a product website and an authenticated console. Both projects use mocked data only; there is no backend.

## Projects

- `console/` — CometAPI-inspired dashboard for models, playground, API keys, usage, billing, activity, team, and settings. Docker port: `3300`.
- `website/` — public Runbridge.ai marketing site with hero, models, platform, pricing, developer CTA, and responsive navigation. Docker port: `3400`.

## Included

- Responsive dashboard and navigation
- Model catalog with client-side filtering
- Interactive playground with mocked responses
- API key creation, copy, and revocation interactions
- Usage analytics and billing views
- Activity, team, and workspace settings views
- Local-only mock state — no backend or external API calls

## Run locally

Run each project independently from its own directory:

```bash
cd console
npm install
npm run dev
```

Open `http://localhost:5173` for the console. For the website, use `cd website && npm install && npm run dev` and open `http://localhost:5174`.

## Production build

```bash
cd console && npm run build
cd ../website && npm run build
```

This repository is a product prototype. All account, usage, billing, and model data is fictional.

## Docker

```bash
docker compose up -d --build
```

The console is served on `http://localhost:3300` and the website on `http://localhost:3400`.
