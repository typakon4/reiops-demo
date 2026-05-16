FROM node:22-slim AS deps

WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_TELEGRAM_BOT_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_TELEGRAM_BOT_URL=$NEXT_PUBLIC_TELEGRAM_BOT_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run start -- -p ${PORT:-3000}"]
