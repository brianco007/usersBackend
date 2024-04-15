# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
ENV MONGO_URI mongodb://mongo:27017/members2
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 8080