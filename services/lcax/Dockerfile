FROM node:24.13.0-slim AS base

FROM base AS builder
WORKDIR /app
RUN npm -g i turbo

COPY . .

RUN turbo prune @services/lcax --docker

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install

COPY --from=builder /app/out/full/ .

FROM base AS runner

RUN useradd --home-dir /app --create-home worker
USER worker
WORKDIR /app

COPY --from=installer /app .

WORKDIR /app/services/lcax
CMD ["npm", "run", "start"]