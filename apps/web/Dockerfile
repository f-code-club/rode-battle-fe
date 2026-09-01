FROM oven/bun:latest AS base
RUN apt-get update && \
    apt-get install -y --no-install-recommends libc6 && \
    rm -rf /var/lib/apt/lists/*
RUN bun add -g turbo @tanstack/router-cli

FROM base AS builder
WORKDIR /build
ENV VITE_GATEWAY_API=CLIENT_GATEWAY_URL
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN turbo prune rode-battle-frontend --docker

FROM base AS installer
WORKDIR /installer
ENV VITE_API_BASE_URL=CLIENT_API_BASE_URL
COPY --from=builder /build/out/json/ ./
RUN bun install --frozen-lockfile

COPY --from=builder /build/out/full/ ./
RUN bun turbo build

FROM nginx:alpine
ENV APP_PREFIX=CLIENT_
ENV ASSET_DIR=/usr/share/nginx/html

COPY --from=installer /installer/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /installer/apps/web/env.sh /docker-entrypoint.d/env.sh
COPY --from=installer /installer/apps/web/dist /usr/share/nginx/html

RUN dos2unix /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]