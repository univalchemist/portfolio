# Portfolio
My Portfolio page backend

# Description (SuperAdmin only)
  - 3rd party APIs
    - DropBox API
    - TelegramBot API

      > You should set the above 2 apis from frontend `Settings` page or set manually in `src/config.json`

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Create admin user

```bash
$ yarn run create:admin <email> <password> <type>
```

## Environment
node: 16.12.0
yarn: 1.22.17

## Run via docker

```bash
$ docker system prune -a
$ docker-compose up --build
```

> This project ran and tested with node `node: 14.18.1, yarn: 1.22.15`

Heroku Bash: heroku ps:exec --app=fatpig-portfolio-api

heroku local web