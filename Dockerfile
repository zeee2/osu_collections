# Build stage
FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable

ARG OSU_CLIENT_ID
ARG OSU_CLIENT_SECRET
ARG COOKIE_SECRET
ENV OSU_CLIENT_ID=$OSU_CLIENT_ID
ENV OSU_CLIENT_SECRET=$OSU_CLIENT_SECRET
ENV COOKIE_SECRET=$COOKIE_SECRET

COPY pnpm-lock.yaml package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Run stage
FROM node:20-alpine
WORKDIR /app
RUN corepack enable

COPY --from=build /app/build ./build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000
CMD ["node", "build"]
