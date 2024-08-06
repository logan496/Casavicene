#FROM ubuntu:latest
#LABEL authors="LOGAN FILS"
#
#ENTRYPOINT ["top", "-b"]
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["node", "server.js"]