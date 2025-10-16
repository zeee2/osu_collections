# 1. Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# 2. Production Stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy production dependency definitions
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy the built application from the build stage
COPY --from=build /app/.svelte-kit/output ./.svelte-kit/output
COPY --from=build /app/node_modules/.prisma ./.prisma

# The SvelteKit node adapter listens on port 3000 by default
EXPOSE 3000

# Set the entrypoint to start the server
CMD ["node", ".svelte-kit/output/server/index.js"]
