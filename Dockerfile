# Arguments
ARG PORT=9000

# Use an official Node.js image as a base
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /api

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Express.js app will run (change as needed)
EXPOSE ${PORT}

# Start the Express.js server using npm (change the start command as needed)
CMD [ "npm", "run", "dev" ]
