# Railway Deployment

Railway is the simplest deployment target for a full integrated ReiOps demo because the web app, FastAPI API, and Telegram bot can live in one project and share service variables.

## Recommended Architecture

Create one Railway project with three services from the same GitHub repository:

1. `reiops-web`
   - Root directory: `apps/web`
   - Dockerfile: `apps/web/Dockerfile`
   - Public domain: enabled

2. `reiops-api`
   - Root directory: `apps/api`
   - Dockerfile: `apps/api/Dockerfile`
   - Public domain: enabled
   - Volume: mount at `/data` for SQLite persistence

3. `reiops-bot`
   - Root directory: `apps/bot`
   - Dockerfile: `apps/bot/Dockerfile`
   - Public domain: not required
   - Runs Telegram long polling

Railway expects public web services to listen on `0.0.0.0:$PORT`. The web and API Dockerfiles already use the Railway `PORT` variable with local fallbacks.

## Step 1: Push To GitHub

Push the `reiops-demo` project to a GitHub repository.

## Step 2: Create Railway Project

In Railway:

1. Create a new project.
2. Add a service from GitHub for `apps/api`.
3. Add a second service from the same GitHub repo for `apps/web`.
4. Add a third service from the same GitHub repo for `apps/bot`.

For each service, set the service root directory to the corresponding app folder.

Railway supports monorepo deployments by creating separate services from the same repository and configuring each service path independently.

## Step 3: API Service

Service: `reiops-api`

Settings:

- Root directory: `apps/api`
- Build: Dockerfile
- Public networking: generate Railway domain
- Volume: mount at `/data`

Variables:

```env
DATABASE_URL=sqlite:////data/reiops_demo.db
DEMO_WORKSPACE_NAME=Demo Engineering
DEMO_REPO_NAME=demo-repo
```

After deployment, copy the public API domain, for example:

```text
https://reiops-api-production.up.railway.app
```

Health check URL:

```text
https://<api-domain>/health
```

## Step 4: Web Service

Service: `reiops-web`

Settings:

- Root directory: `apps/web`
- Build: Dockerfile
- Public networking: generate Railway domain

Variables:

```env
NEXT_PUBLIC_API_URL=https://<api-domain>
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/ReiOps_bot?start=demo
```

After deployment, copy the public web domain, for example:

```text
https://reiops-web-production.up.railway.app
```

## Step 5: Bot Service

Service: `reiops-bot`

Settings:

- Root directory: `apps/bot`
- Build: Dockerfile
- Public networking: not needed

Variables:

```env
TELEGRAM_BOT_TOKEN=<token from BotFather>
API_URL=https://<api-domain>
PUBLIC_WEB_URL=https://<web-domain>
WEB_DEMO_URL=https://<web-domain>/demo
```

The bot uses long polling, so it does not need a webhook URL or public Railway domain.

## Step 6: Test The Integrated Demo

1. Open the web domain.
2. Click `Try Web Demo`.
3. Confirm `/demo` does not show `Mock demo mode`.
4. Click `Deploy GitHub Issue Fixer`.
5. Open `https://t.me/ReiOps_bot?start=demo`.
6. Run the Telegram demo and approve the blocked PR action.
7. Confirm the web dashboard reflects the same approval state.

## Notes

- Without `NEXT_PUBLIC_API_URL`, the web app intentionally falls back to mock demo mode.
- Without `TELEGRAM_BOT_TOKEN`, the bot container stays idle.
- For the MVP, SQLite with a Railway volume is enough.
- Later, if the demo needs multi-user reliability or analytics, replace SQLite with Railway Postgres and add a Postgres driver to `apps/api`.
- A custom domain is optional. Railway-generated domains are enough for demos and investor review.
