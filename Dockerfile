FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including dev dependencies, needed for dev server)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose required port for Hugging Face Space
ENV PORT=7860
EXPOSE 7860

# Run the Next.js development server (listens on 0.0.0.0:7860)
CMD ["npm", "run", "dev"]
