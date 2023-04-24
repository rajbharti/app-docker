FROM node:18-alpine AS build
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . ./
RUN pnpm run build
EXPOSE 3000

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
