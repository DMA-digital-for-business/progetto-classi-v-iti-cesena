FROM node:18-alpine

ARG SERVICE_PATH

# Create server directory
WORKDIR /usr/src/server
# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY $SERVICE_PATH/package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle server source
COPY $SERVICE_PATH .

EXPOSE 3000

# CMD [ "ls", "-la", "/usr/src/server/src" ]
CMD [ "npm", "start" ]