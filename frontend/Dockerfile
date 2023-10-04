# Use the official Node.js image as the base image
FROM node:18.15.0-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
