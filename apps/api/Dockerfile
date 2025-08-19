# Stage 1: Build and Prune Dependencies
# This stage installs all dependencies and creates the production build.
FROM docker.io/node:lts-alpine as builder

# Set the working directory for the build stage.
WORKDIR /app

# Enable corepack for Yarn.
RUN corepack enable

# Copy all source files and configuration.
# This copies everything needed for the build, including the nx-specific files.
COPY . .

# Install all dependencies (including dev dependencies) required for the build.
RUN yarn install

# Run the build and "prune" the output to create a production-ready folder.
# This step creates a minimal package.json, yarn.lock, and the built application
# in the 'dist/apps/api' folder.
RUN npx nx run api:prune --prod

# ---
# Stage 2: Create a Lightweight Production Image
# This stage starts from a clean base and only includes what's necessary to run the app.
FROM docker.io/node:lts-alpine

# Set the working directory for the final container.
WORKDIR /app

# Enable corepack for Yarn.
RUN corepack enable

# Copy the pruned and built application from the builder stage.
# This copies the entire contents of 'dist/apps/api' (which now includes
# the production-only package.json and the built code) into the root of the
# final container's working directory.
COPY --from=builder /app/dist/apps/api ./

# Copy the root package.json and yarn.lock to ensure shared dependencies are installed.
# This is a key change to fix the "module not found" error.

# Install only the production dependencies from the root package.json.
# This ensures a minimal footprint for the final image.
RUN yarn install --production --frozen-lockfile

# Define the command to run the application.
# The entry file 'main.js' is now at the root of the working directory.
CMD [ "node", "main.js" ]