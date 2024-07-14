# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.19

# Set the working directory in the container
WORKDIR /usr/src/app

RUN apk add --no-cache yarn

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# RUN npm install yarn -g
# Install any needed packages specified in package.json
# RUN yarn 

# Copy the rest of the application code to the working directory
COPY . .

# Make the send.js file executable
# RUN chmod +x send.js

# Command to run the send.js file
# CMD ["npm", "start"]
