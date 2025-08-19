# Stage 1: Build stage
FROM node:lts-alpine AS builder

WORKDIR /app

# Enable corepack for Yarn
RUN corepack enable

# Copy package.json and yarn.lock first to leverage Docker cache for dependencies
COPY package.json yarn.lock ./

# Copy workspace packages and apps definitions (if needed)
COPY . .

RUN yarn install
# Install dependencies
# Copy rest of the source code (if not all copied above)
# (optional if you copied everything in previous steps)
# COPY . .

# Run the build for the web app
RUN yarn build:api

# Stage 2: Production image
FROM node:lts-alpine

WORKDIR /app

RUN corepack enable

# Copy built app from builder
COPY --from=builder /app/dist/apps/web ./dist

# Copy package.json and yarn.lock to install production dependencies
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Set environment variables if needed, e.g., NODE_ENV=production
ENV NODE_ENV=production

# Expose port if your app listens on a port (e.g., 3000)
EXPOSE 3000

# Run the built app
CMD ["node", "dist/main.js"]