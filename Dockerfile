FROM node:14.19.1
ENV HOST 0.0.0.0
COPY . /app
WORKDIR /app
RUN yarn install




