FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache netcat-openbsd
RUN npm install
RUN npm install pg
RUN npm install -g sequelize-cli
RUN npx sequelize-cli init

COPY . .

EXPOSE 5000
