FROM shivjm/node-chromium-alpine:node14-chromium81 AS development

RUN mkdir -p /app
WORKDIR /app

ENV ENV=prod
ENV PORT=5000

COPY package*.json ./
COPY yarn.lock ./

RUN yarn add glob rimraf

RUN npm install -g @nestjs/cli

RUN yarn install --only=development

COPY . .

RUN yarn build


FROM shivjm/node-chromium-alpine:node14-chromium81 As production

ARG MONGO_HOST_URL

ENV ENV=prod
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_HOST_URL=${MONGO_HOST_URL}

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=development /app/dist  ./dist 

# RUN chmod +x /app/src/config.json

EXPOSE 5000

CMD ["npm", "run", "start:prod"]