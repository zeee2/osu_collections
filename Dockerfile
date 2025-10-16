# Stage 1: Build the application
FROM ubuntu:22.04 AS build

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies, curl, and Node.js (v20)
RUN apt-get update && \
    apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# These ARGs will be populated by docker-compose from the .env file
ARG OSU_CLIENT_ID
ARG OSU_CLIENT_SECRET

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./ 

# Install all dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Generate SvelteKit's internal types and tsconfig
RUN pnpm svelte-kit sync

# Build the application, passing the ARGs as environment variables
RUN OSU_CLIENT_ID=${OSU_CLIENT_ID} OSU_CLIENT_SECRET=${OSU_CLIENT_SECRET} pnpm run build


# Stage 2: Create the production image
FROM ubuntu:22.04 AS production

ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js (v20)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency definitions
COPY package.json pnpm-lock.yaml ./ 

# Install only production dependencies
RUN pnpm install --prod

# Copy the built application from the build stage
COPY --from=build /app/.svelte-kit/output ./.svelte-kit/output

# Expose the port the app runs on
EXPOSE 3000

# Set the user to run the app (optional, but good practice)
USER node

# Set the entrypoint to start the server
CMD ["node", ".svelte-kit/output/server/index.js"]