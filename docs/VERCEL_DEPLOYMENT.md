# Vercel Deployment

Use this configuration for the ReiOps web app.

## Project Settings

- Root directory: `apps/web`
- Build command: `npm run build`
- Dev command: `npm run dev`
- Output directory: Next.js default

## Required Environment Variables

- `NEXT_PUBLIC_API_URL`
  - Public base URL for the ReiOps API service.
  - Example: `https://api.reiops.example.com`
  - If missing or unavailable, `/demo` falls back to local frontend mock mode.

- `NEXT_PUBLIC_TELEGRAM_BOT_URL`
  - Public URL for the Telegram demo bot.
  - Used by the homepage `Run Telegram Demo` CTA.
  - Recommended value: `https://t.me/ReiOps_bot?start=demo`
  - If the value is set without a `start` parameter, the web app appends `?start=demo`.

## Backend Services

FastAPI and the Telegram bot are deployed separately later on a VPS.

The Vercel web app should still build and the `/demo` route should still work before the backend is deployed because the frontend includes a mock demo fallback.
