# 1. Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# These ARGs will be populated by docker-compose from the .env file
ARG OSU_CLIENT_ID
ARG OSU_CLIENT_SECRET

# Install pnpm
RUN npm install -g pnpm

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate SvelteKit's internal types and tsconfig to fix build warnings
RUN pnpm svelte-kit sync

# Build the application, passing the ARGs as environment variables for the build command
RUN OSU_CLIENT_ID=${OSU_CLIENT_ID} OSU_CLIENT_SECRET=${OSU_CLIENT_SECRET} pnpm run build

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
