# Multi-container application running with Docker

A simple books api application

```
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
- Install [Docker](https://docs.docker.com/desktop/)

## 1. Running application with `docker-compose`

- Run following from root of project

```shell
docker-compose up -d
```

- It pull and/or create images.
- Create network, volume, containers.

#### Start the application

- Open http://localhost:3001

#### To view app files and mongodb

```shell
# To view app files
docker exec -it app-docker-api-1 sh
ls

# To view mongodb from mongosh
docker exec -it app-docker-mongo-1 mongosh -u admin -p admin
show dbs

# To view mongodb from browser
http://localhost:8081
```

#### Remove created containers, network & volume

- Run following from root of project

```shell
# remove containers
docker-compose down --volumes

# to remove app images also
docker-compose down --volumes --rmi "local"
```

## 2. Running application with `docker run`

#### Create a docker network

```shell
docker network create app-docker-network
```

#### Create a volume to persist mongodb data

```shell
docker volume create app-docker-db-volume
```

#### Start mongo in defined network and use defined volume

```shell
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

```shell
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

- Open **mongo-express** from browser by http://localhost:8081 to view mongodb as web based interface
- or access to **mongodb** from `mongosh` cli

```shell
docker exec -it app-docker-mongo mongosh -u admin -p admin
```

#### Start the application

```shell
cd api
# Create copy of .env.example and rename it to .env in the same location
npm i
npm run dev
```

- Open http://localhost:3001

#### Remove created containers, network & volume

```shell
# remove containers
docker rm -f app-docker-mongo app-docker-mongo-express

# remove network
docker network rm app-docker-network

# remove volume
docker volume rm app-docker-db-volume
```
