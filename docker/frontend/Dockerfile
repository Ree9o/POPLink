FROM node:20.10.0-slim

RUN apt-get update

WORKDIR /app

# Copy package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source files
COPY . .

CMD ["npm", "run", "dev"]
