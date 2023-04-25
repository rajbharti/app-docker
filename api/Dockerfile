FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build
CMD ["pnpm", "start"]
EXPOSE 3001
