FROM node:20-alpine AS builder
WORKDIR /app

# Install all dependencies (including dev dependencies needed for the build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build the production bundle
COPY . .
RUN npm run build

# ---------- Production image ----------
FROM node:20-alpine
WORKDIR /app

# Copy built assets and node_modules from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Environment for Hugging Face Spaces
ENV NODE_ENV=production
ENV PORT=7860
EXPOSE 7860

# Start the Next.js production server
CMD ["npm", "start"]
