FROM node:20-alpine as builder

ENV NODE_ENV=build
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .  
RUN npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

# --- Production stage ---
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma ./prisma

EXPOSE 4000
CMD ["npm", "start"]
