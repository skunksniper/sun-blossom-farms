FROM node:20-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Build client
COPY client/package*.json ./client/
RUN cd client && npm install

COPY client/ ./client/
RUN cd client && npm run build

# Install server (production deps only)
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY server/ ./server/

ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

CMD ["node", "server/index.js"]
