# distributed-blogcms-frontend/Dockerfile
FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install production dependencies only
RUN npm install --production

COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your production-ready frontend application
CMD ["npm", "start"]
