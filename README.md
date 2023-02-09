# Multi-container application running with Docker

A simple books application

## Tech Stack

- [MERN stack](https://www.mongodb.com/mern-stack)
- [Docker](https://www.docker.com/)
  - images
    - [mongo](https://hub.docker.com/_/mongo) _(mongodb)_
    - optional: [mongo-express](https://hub.docker.com/_/mongo-express) _(mongodb web based interface)_

## Prerequisites

- Install [Node](https://nodejs.org/en/download/)
- Install [Docker](https://docs.docker.com/desktop/)

## 1. Running application with `docker-compose`

- Run following from root of project

```bash
docker-compose up -d
```

- Pull & create images
- Create containers, network, volume

#### Start the application

- Open http://localhost:3000

#### Remove created containers, network & volume

- Run following from root of project

```bash
# remove containers
docker-compose down --volumes

# to remove app images also
# docker-compose down --volumes --rmi "local"
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

- Open http://localhost:3000

#### Remove created containers, network & volume

```bash
# remove containers
docker rm -f app-docker-mongo
docker rm -f app-docker-mongo-express

# remove network
docker network rm app-docker-network

# remove volume
docker volume rm app-docker-db-volume
```
