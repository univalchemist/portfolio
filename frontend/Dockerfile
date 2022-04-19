FROM node:16-alpine AS build

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --silent

RUN npm install -g serve

COPY . .

RUN yarn build

ENV NODE_ENV=production

# CMD ["npm", "run", "start"]

