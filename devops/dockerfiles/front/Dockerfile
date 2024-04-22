# Choose the Node.js LTS version
# FROM node:16-alpine
# FROM node:20.9.0-alpine
FROM node:lts

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Nuxt.js
RUN npm install --save nuxt

# # Install pnpm globally
# RUN npm install -g pnpm

# Install dependencies in the container
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "dev" ]
