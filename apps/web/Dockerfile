# -----------------------
# 1. Base dependencies
# -----------------------
FROM node:20-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./

# -----------------------
# 2. Install dependencies
# -----------------------
FROM base AS deps

# Install only prod dependencies first
RUN yarn install --frozen-lockfile

# -----------------------
# 3. Build Next.js app
# -----------------------
FROM deps AS builder

WORKDIR /app
COPY . .

# Set env so Next.js builds in production mode
ENV NODE_ENV=production

# Build the app (adjust if using Nx executor)
RUN yarn nx build web


# -----------------------
# 4. Production runner
# -----------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Next.js default port
ENV PORT=3000
EXPOSE 3000

# Add non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy build artifacts & required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

USER nextjs

CMD ["yarn", "start"]
