FROM node:12.8-alpine AS build

ARG SERVER_URL

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY ./ ./
ENV SERVER_URL=${SERVER_URL}
RUN npm run build

FROM nginx:1.17.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
