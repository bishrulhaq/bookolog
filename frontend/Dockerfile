# Use the official Node.js image as the base image
FROM node:18.15.0-alpine

# Set the working directory in the container to /app
RUN apk add --no-cache libc6-compat

# Set the working directory in the container to /app
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install

# Install the dependencies
COPY . .

# Run npm install to install the dependencies of the frontend
COPY docker-entrypoint.sh /

CMD ["sh", "-c", "if [ \"$APP_ENV\" == \"development\" ]; then npm run dev; else chmod +x /docker-entrypoint.sh; fi"]

ENTRYPOINT ["/bin/sh", "/docker-entrypoint.sh"]
