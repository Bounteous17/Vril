FROM node:10.13.0

RUN mkdir /app
WORKDIR /app
COPY package.json /app/

RUN npm i