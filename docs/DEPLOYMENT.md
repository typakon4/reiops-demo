# Deployment

This demo can run locally or on a small VPS.

## Local Docker Compose

```bash
cp .env.example .env
docker compose --env-file .env up -d --build
```

Open:

- Web: http://localhost:3000
- Demo: http://localhost:3000/demo
- API health: http://localhost:8000/health
- Current run: http://localhost:8000/api/runs/current

## Environment

```env
TELEGRAM_BOT_TOKEN=
PUBLIC_WEB_URL=http://localhost:3000
WEB_DEMO_URL=http://localhost:3000/demo
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/ReiOps_bot?start=demo
API_URL=http://api:8000
DATABASE_URL=sqlite:////data/reiops_demo.db
DEMO_WORKSPACE_NAME=Demo Engineering
DEMO_REPO_NAME=reiops-demo
```

`NEXT_PUBLIC_*` values are baked into the Next.js client during build. Rebuild the web image after changing them.

## VPS + Caddy Example

DNS:

```text
A     @      <VPS_IP>
A     api    <VPS_IP>
A     www    <VPS_IP>
```

Example production env:

```env
PUBLIC_WEB_URL=https://reiops.xyz
WEB_DEMO_URL=https://reiops.xyz/demo
NEXT_PUBLIC_API_URL=https://api.reiops.xyz
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/ReiOps_bot?start=demo
API_URL=http://api:8000
DATABASE_URL=sqlite:////data/reiops_demo.db
```

Caddy example:

```caddyfile
reiops.xyz {
    encode gzip zstd
    reverse_proxy 127.0.0.1:3000
}

www.reiops.xyz {
    redir https://reiops.xyz{uri}
}

api.reiops.xyz {
    encode gzip zstd

    @options method OPTIONS
    respond @options 204

    reverse_proxy 127.0.0.1:8000
}
```

If another service already uses ports `3000` or `8000` on the host, bind the containers to alternative localhost ports and update Caddy accordingly.

## Operations

```bash
docker compose --env-file .env ps
docker compose --env-file .env logs -f web
docker compose --env-file .env logs -f api
docker compose --env-file .env logs -f bot
```

Update deployment:

```bash
git pull
docker compose --env-file .env up -d --build
```

## Safety

- Do not commit `.env`.
- Do not commit Telegram tokens.
- Do not expose the SQLite database file publicly.
- The bot uses long polling and does not need an exposed port.
