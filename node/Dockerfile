FROM node:15 AS builder

WORKDIR /usr/src/app

COPY . .

RUN yarn

FROM node:15-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

ENV DOCKERIZE_VERSION v0.6.1

RUN apk update && apk add wget

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000