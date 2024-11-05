# Use a Node.js base image 
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY Frontend/package.json ./
RUN npm install

# Copy your application code
COPY frontend/. .

# Build the React application
RUN npm run build

# Expose the port your app listens on
EXPOSE 8080

# Use a production-ready web server (Nginx in this example)
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
