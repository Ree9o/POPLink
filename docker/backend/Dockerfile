FROM node:20.10.0-slim

RUN apt-get update && apt-get install -y openssl procps

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm i -g @nestjs/cli
RUN npm i -D prisma
RUN npm i @prisma/client
RUN npm i
COPY . .
RUN npx prisma generate



CMD ["npm", "run", "start:dev"]
