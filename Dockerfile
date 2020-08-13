FROM node:8
# Create app directory
WORKDIR /home/dev/enradyo
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8081
CMD [ "npm", "run", "build" ]
CMD [ "node", "server.js" ]
