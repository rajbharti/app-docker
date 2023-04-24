FROM node:18-alpine AS build
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
ENV VITE_API_BASE_URL=http://localhost:3001
RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
