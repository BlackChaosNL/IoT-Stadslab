# Get smallest possible Linux variant to run Node Server.
FROM node:11-alpine

# Add Git to pull TTN module.
RUN apk add --no-cache bash git

# Create a directory to save the API in.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Copy default env variables, so it can be used immediately after pulling from the repository.
COPY src/environment/.env.default src/environment/.env

# Install dependancies to Alpine
RUN npm install

# Copy folder
COPY . .

# Expose the port to allow communication to flow through.
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
