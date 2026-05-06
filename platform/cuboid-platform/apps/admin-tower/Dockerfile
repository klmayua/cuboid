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
RUN pnpm build
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /apps/admin-tower ./apps/admin-tower
COPY --from=builder /apps/partner-portal ./apps/partner-portal
COPY --from=builder /apps/regulator-portal ./apps/regulator-portal
COPY --from=builder /packages ./packages
COPY --from=builder package.json ./
EXPOSE 3000
ENV PORT=3000
ENTRYPOINT ["dumb-init", "node"]
CMD ["apps/admin-tower/dist/server.js"]