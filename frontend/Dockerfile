FROM node:23.1

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build:ts

EXPOSE 3006

CMD ["npm", "start"]