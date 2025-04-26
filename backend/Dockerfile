# Backend Dockerfile
FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 5050

CMD ["npm", "run", "server"]