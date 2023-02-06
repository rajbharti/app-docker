# Running application in docker

> A simple api application with following endpoints

```rest
GET:     /books
GET:     /books
GET:     /books/:id
POST:    /books
PUT:     /books/:id
DELETE:  /books/:id
```

## Prerequisites

- [Docker](https://docs.docker.com/desktop/)
- [Node.js](https://nodejs.org/en/download/)

## Tech Stack

- Docker
  - images
    - mongo (mongodb)
    - mongo-express (mongodb web based interface)
- Express.js
- MongoDB
- Node.js

## 1. Running with Docker

#### Create docker network

```
docker network create app-network
```

#### Start mongo

```
docker run -d \
	--name app-mongo-1 \
	--network app-network \
	-p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo
```

#### Start mongo-express

```
docker run -d \
	--name app-mongo-express-1 \
	--network app-network \
	-p 8081:8081 \
	-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
	-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
	-e ME_CONFIG_MONGODB_SERVER=app-mongo-1 \
	mongo-express
```

#### To view mongodb

- Open **mongo-express** from browser `http://localhost:8081` to view mongodb as web based interface
- or connect to **mongodb** from `mongosh` cli

```
docker exec -it app-mongo-1 mongosh -u admin -p admin
```

#### Start the application

```
cd client
# copy .env.example to .env in the same location and set the username and password
npm install
npm start
```

- Open the application in browser by http://localhost:3001

## 2. Running with Docker Compose

#### Create the containers

- Run following from root of project

```
docker-compose up -d --build
```

#### Start the application

- Open the application in browser by http://localhost:3001

## 3. Running from Image

#### Create the images

- Run following from root of project

```
docker build -t app-docker . --no-cache
```

#### Start the image

```
docker run -d --name app-docker-1 -p 3001:3001 app-docker
```
