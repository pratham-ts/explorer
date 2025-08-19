# Stage 1: The Build Stage
# We'll use a Node.js base image with Alpine for a smaller footprint.
FROM docker.io/node:lts-alpine as builder

# Set the working directory inside the container.
WORKDIR /app

# Copy the package.json and yarn.lock files first.
# This allows Docker to use layer caching, speeding up subsequent builds if these files haven't changed.
COPY package.json yarn.lock ./

# Install all dependencies.
# We'll use yarn, as it's common in Next.js projects.
RUN yarn install

# Copy the rest of the application source code.
COPY . .

# Build the Next.js application for production.
# This command generates the optimized build files in the `.next` directory.
RUN yarn build:web

# ---
# Stage 2: The Production Image
# We'll use the same base image but start from a fresh slate to keep it lightweight.
FROM docker.io/node:lts-alpine

# Set the working directory for the final application.
WORKDIR /app

# Set the environment variable for production.
ENV NODE_ENV production

# Copy the necessary files from the builder stage.
# We're specifically copying the `.next` and `public` folders which contain the production artifacts.
# The `.next/standalone` folder is a feature in newer Next.js versions that creates a self-contained server.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose the default port for Next.js.
EXPOSE 3000

# Define the command to start the Next.js server.
# This points to the entry point created by the standalone build.
CMD ["node", "server.js"]