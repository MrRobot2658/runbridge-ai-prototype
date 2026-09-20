# Runbridge.ai Frontend Prototypes

A blue-themed Runbridge.ai prototype containing two independent frontend projects in one repository: a product website and an authenticated console. Both projects use mocked data only; there is no backend.

## Projects

- `console/` — CometAPI information architecture with Workspace, Finance, Administration, and Quick links groups. It includes dashboard, playground, API keys, usage logs, Midjourney/task logs, credits, referrals, personal/workspace settings, channels, routing, model management, audit, users, organizations, docs, pricing, status, and legal pages. Docker port: `3300`.
- `website/` — public Runbridge.ai marketing site following CometAPI’s page sequence: hero, stats, recommended models, pricing, integrations, production features, integration flow, use cases, testimonials, FAQ, CTA, and footer. Docker port: `3400`.

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

Open `http://localhost:5173` for the console. The website uses static HTML, CSS, and JavaScript with a Python page generator; it does not require npm. From the repository root, run:

```bash
python3 -m http.server 5174 --directory website/dist
```

Open `http://localhost:5174` for the website. See [website/README.md](website/README.md) for editing and deployment details.

## Production build

```bash
cd console && npm run build
cd ../website && python3 scripts/build-pages.py
```

The website's `dist/` directory is committed because it contains both generated pages and the source styles, scripts, and images needed for deployment.

This repository is a product prototype. All account, usage, billing, and model data is fictional.

## Docker

```bash
docker compose up -d --build
```

The console is served on `http://localhost:3300` and the website on `http://localhost:3400`.
