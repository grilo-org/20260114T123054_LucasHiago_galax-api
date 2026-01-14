# Use the official Node.js image as a base
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the application files (package.json and package-lock.json)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application code to the container
COPY . .

# Specify the command to start the application
CMD ["npm", "start"]
