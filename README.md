# Multi-container application running with Docker

A simple api application with following endpoints

```
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

## Prerequisites

- Install [Node](https://nodejs.org/en/download/)
- Insall [Docker](https://docs.docker.com/desktop/)

## 1. Running application with `docker-compose`

#### Create and run the containers

- Run following from root of project

```bash
docker-compose up -d
```

#### Start the application

- Open the application in browser by http://localhost:3001

#### Remove created containers, network & volumes

- Run following from root of project

```bash
docker-compose down --volumes # created network removed after removing containers
```

## 2. Running application with `docker run`

#### Create a docker network

```bash
docker network create app-docker-network
```

#### Create a volume to persist mongodb data

```bash
docker volume create app-docker-db-volume
```

#### Start mongo in defined network and use defined volume

```bash
docker run -d \
    --name app-docker-mongo \
    --network app-docker-network \
    -v app-docker-db-volume:/data/db \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    mongo
```

#### Start mongo-express in defined network

```bash
docker run -d \
    --name app-docker-mongo-express \
    --network app-docker-network \
    -p 8081:8081 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
    -e ME_CONFIG_MONGODB_SERVER=app-docker-mongo \
    mongo-express
```

#### To view mongodb

- Open **mongo-express** from browser http://localhost:8081 to view mongodb as web based interface
- or connect to **mongodb** from `mongosh` cli

```bash
docker exec -it app-docker-mongo mongosh -u admin -p admin
```

#### Start the application

```bash
cd server
# Create copy of .env.example and rename it to .env in the same location
npm i
npm run dev
```

- Open the application in browser by http://localhost:3001

#### Remove created containers, network & volume

```bash
docker rm -f app-docker-mongo
docker rm -f app-docker-mongo-express
docker network rm app-docker-network
docker volume rm app-docker-db-volume
```
