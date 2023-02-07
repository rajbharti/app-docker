# Running application in Docker

A simple api application with following endpoints

```rest
GET:     /books
GET:     /books
GET:     /books/:id
POST:    /books
PUT:     /books/:id
DELETE:  /books/:id
```

## Tech Stack

- [Node](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
  - images
    - [mongo](https://hub.docker.com/_/mongo) _(mongodb)_
    - optional: [mongo-express](https://hub.docker.com/_/mongo-express) _(mongodb web based interface)_

## Getting Started

### Prerequisites

- Install following
  - [Node](https://nodejs.org/en/download/)
  - [Docker](https://docs.docker.com/desktop/)

### 1. Running with Docker

#### Create a docker network

```
docker network create app-docker-network
```

#### Start mongo in that network

```
docker run -d \
	--name app-docker-mongo-1 \
	--network app-docker-network \
    -p 27017:27017 \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo
```

#### Start mongo-express in that network

```
docker run -d \
	--name app-docker-mongo-express-1 \
	--network app-docker-network \
	-p 8081:8081 \
	-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
	-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
	-e ME_CONFIG_MONGODB_SERVER=app-docker-mongo-1 \
	mongo-express
```

#### To view mongodb

- Open **mongo-express** from browser http://localhost:8081 to view mongodb as web based interface
- or connect to **mongodb** from `mongosh` cli

```
docker exec -it app-docker-mongo-1 mongosh -u admin -p admin
```

#### Start the application

```
cd server
# Create copy of .env.example and rename it to .env in the same location
npm i
npm run dev
```

- Open the application in browser by http://localhost:3001

### 2. Running with Docker Compose

#### Create the containers

- Run following from root of project

```
docker-compose up -d
```

#### Start the application

- Open the application in browser by http://localhost:3001

### 3. Running from Image

#### Create the image

- Run following from root of project

```
docker build -t app-docker . --no-cache
```

#### Start the container

```
docker run -d --name app-docker-1 -p 3001:3001 app-docker
```
