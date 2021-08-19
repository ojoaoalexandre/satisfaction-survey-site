FROM node:14

# App Directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["node", "server.js"]