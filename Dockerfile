FROM node:12.16.1-alpine3.11 AS build
WORKDIR /app
ARG REACT_APP_API

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN REACT_APP_API=${REACT_APP_API} yarn build

FROM node:12.16.1-alpine3.11
WORKDIR /app
COPY --from=build /app/start.sh /app
COPY --from=build /app/build /app

RUN yarn global add serve

CMD ["sh", "start.sh"]