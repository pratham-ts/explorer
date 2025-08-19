# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

RUN corepack enable
RUN apk add --no-cache git

# Copy only package.json/yarn.lock for dependency install
COPY package.json yarn.lock ./

# Install deps (including dev for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app with Nx (creates standalone build)
RUN yarn nx build web --configuration=production

# Stage 2: Runtime
FROM node:lts-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copy only standalone build + required files
COPY --from=builder /app/dist/apps/web/.next/standalone ./ 
COPY --from=builder /app/dist/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

# If Next.js needs package.json for runtime
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
