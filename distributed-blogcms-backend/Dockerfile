# distributed-blogcms-backend/Dockerfile
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g

# Install production dependencies only
RUN npm install --production

COPY . .

# Build TypeScript to JavaScript
RUN npm run build


# Expose the port your app runs on
EXPOSE 8080

# Command to run your production-ready backend application
#CMD ["pm2-runtime", "npm", "start"]
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
