FROM node:12.8-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY ./ ./
RUN npm run build

FROM nginx:1.17.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
