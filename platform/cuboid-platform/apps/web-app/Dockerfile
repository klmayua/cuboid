FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache dumb-init curl
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile --prod
FROM base AS builder
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @cuboid/web-app build
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /apps/web-app ./apps/web-app
COPY --from=builder package.json ./
EXPOSE 3000
ENV PORT=3000
ENTRYPOINT ["dumb-init", "node"]
CMD ["apps/web-app/dist/server.js"]