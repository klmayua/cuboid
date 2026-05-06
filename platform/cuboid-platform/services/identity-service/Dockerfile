FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache dumb-init

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile --prod

FROM base AS builder

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM base AS runner

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000

ENV PORT=3000
ENV NODE_PORT=3000

LABEL org.opencontainers.image.source="https://github.com/insane/cuboid"
LABEL org.opencontainers.image.title="cuboid-service"

ENTRYPOINT ["dumb-init", "node"]

CMD ["dist/index.js"]