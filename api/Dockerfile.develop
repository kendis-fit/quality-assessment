FROM node:12.16.1-alpine3.11 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

CMD ["node", "dist/main"]