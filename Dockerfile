FROM node:16

# Set the working directory
WORKDIR /src/app


# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the application port
EXPOSE 5050

# Start the application
CMD ["node", "dist/main"]