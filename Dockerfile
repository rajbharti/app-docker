FROM node:18-alpine
WORKDIR /app

COPY ./server/package* ./
RUN npm i
COPY ./server ./

EXPOSE 3000

CMD ["npm", "start"]
