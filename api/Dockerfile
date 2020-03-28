FROM node:12.16.1-alpine3.11 AS build
WORKDIR /app

COPY . .
RUN yarn install

RUN yarn build

CMD ["node", "dist/main"]