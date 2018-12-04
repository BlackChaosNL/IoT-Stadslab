# Get smallest possible Linux variant to run Node Server.
FROM node:8-alpine

# Add Git to pull TTN module.
RUN apk add --no-cache git

# Create a directory to save the API in.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependancies to Alpine
RUN npm install

# Copy folder
COPY . .

# Expose the port to allow communication to flow through.
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
