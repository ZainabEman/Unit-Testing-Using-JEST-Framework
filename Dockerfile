# Use a Node.js image as the base
FROM node:16

# Set the working directory within the Docker container
WORKDIR /app

# Copy only the package.json and package-lock.json files to install dependencies first
COPY package*.json ./

# Install project dependencies (including Jest)
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Command to run tests
CMD ["npm", "test"]
