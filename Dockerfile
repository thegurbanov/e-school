# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.19.1-alpine3.15 as build-stage

# Setting timezone
# ENV TZ Asia/Baku

# Preparing working environment.
WORKDIR /app
COPY package*.json /app/

# Installing dependencies.
RUN npm install --silent

# Copy source into image.
COPY ./ /app/

# Testing with Chrome Headless using Puppeteer.
# RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

# Pass buildtime arguments.
ARG configuration=cloud

# Building app.
RUN npm run build --  --aot --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx.
FROM nginx:alpine

# Copying source into web server root.
COPY --from=build-stage /app/dist/out/ /etc/nginx/html
# /usr/share/nginx/html

# Copying nginx configuration.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
