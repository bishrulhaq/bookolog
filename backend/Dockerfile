# Use an official Node.js runtime as a parent image
FROM node:18.15.0-alpine

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application will run
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]