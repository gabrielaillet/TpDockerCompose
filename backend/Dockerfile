FROM node:23.1
# Create app directory in container
WORKDIR /app
COPY . .
RUN npm install -g fastify-cli
RUN npm install
RUN npm run build:ts
RUN rm -f /app/db/LOCK

CMD ["fastify", "start","-l","info","dist/app.js"]
EXPOSE 8080