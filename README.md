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

## Running with Docker

#### 1. Create docker network

```
docker network create mongo-network
```

#### 2. Start mongo

```
docker run -d \
	--name demo-api-mongo \
	--network mongo-network \
	-p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo
```

#### 3. Start mongo-express

```
docker run -d \
	--name demo-api-mongo-express \
	--network mongo-network \
	-p 8081:8081 \
	-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
	-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
	-e ME_CONFIG_MONGODB_SERVER=demo-api-mongo \
	mongo-express
```

Check running containers with `docker ps`

#### 4. To view mongodb

- Open **mongo-express** from browser `http://localhost:8081` to view mongodb as web based interface
- or connect to **mongodb** from `mongosh` cli

```
docker exec -it demo-api-mongo mongosh "mongodb://admin:admin@localhost:27017"
```

#### 5. Start the api application

```
cd app
# copy .env.example to .env in the same location and set the username and password
npm install
npm start
```

Open the application in browser by http://localhost:5000
