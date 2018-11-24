FROM node:10.13.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

EXPOSE 8989
CMD ["node", "index.js"]