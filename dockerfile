# syntax=docker/dockerfile:1
FROM node:14-alpine
WORKDIR /trend-movies-back
COPY . .
RUN yarn install && yarn build
CMD ["npm", "run", "start:prod" ]
